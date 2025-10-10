import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';
import Payment from '../models/Payment';
import phonePeService from '../services/phonePeService';
import { generateTransactionId } from '../utils/crypto';
import { phonePeConfig } from '../config/phonepe';
import { CreateOrderRequest } from '../types/payment.types';
import { IUser } from '../models/User';

/**
 * Create order and initiate payment
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user as IUser;
    const userId = user?._id?.toString();
    
    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const orderData: CreateOrderRequest = req.body;

    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      res.status(400).json({ success: false, message: 'Order must contain at least one item' });
      return;
    }

    if (!orderData.shippingAddress) {
      res.status(400).json({ success: false, message: 'Shipping address is required' });
      return;
    }

    // Validate amount (minimum 1 rupee)
    if (orderData.totalAmount < 1) {
      res.status(400).json({ success: false, message: 'Order amount must be at least ₹1' });
      return;
    }

    // Create order
    const order = new Order({
      userId,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shippingCharges: orderData.shippingCharges || 0,
      tax: orderData.tax || 0,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      couponCode: orderData.couponCode,
      notes: orderData.notes,
      paymentStatus: 'PENDING',
      orderStatus: 'CREATED'
    });

    await order.save();

    // Generate unique transaction ID
    const merchantTransactionId = generateTransactionId('MT');

    // Create payment record
    const payment = new Payment({
      userId,
      orderId: order._id,
      merchantTransactionId,
      amount: orderData.totalAmount,
      status: 'PENDING'
    });

    await payment.save();

    // Initiate PhonePe payment
    const paymentRequest = {
      merchantTransactionId,
      merchantUserId: userId.toString(),
      amount: orderData.totalAmount,
      mobileNumber: orderData.shippingAddress.phoneNumber,
      redirectUrl: `${phonePeConfig.redirectUrl}?orderId=${order._id}`,
      redirectMode: 'POST',
      callbackUrl: phonePeConfig.callbackUrl,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const phonePeResponse = await phonePeService.initiatePayment(paymentRequest);

    if (phonePeResponse.success) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: order._id,
          orderNumber: order.orderNumber,
          paymentUrl: phonePeResponse.data?.instrumentResponse?.redirectInfo?.url,
          merchantTransactionId
        }
      });
    } else {
      // Update order and payment status
      order.orderStatus = 'CANCELLED';
      await order.save();
      
      payment.status = 'FAILED';
      payment.responseCode = phonePeResponse.code;
      payment.responseMessage = phonePeResponse.message;
      await payment.save();

      res.status(400).json({
        success: false,
        message: 'Payment initiation failed',
        error: phonePeResponse.message
      });
    }
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

/**
 * Handle PhonePe callback
 */
export const handleCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('PhonePe Callback Received:', {
      body: req.body,
      headers: req.headers
    });

    const { response } = req.body;
    const xVerify = req.headers['x-verify'] as string;

    if (!response || !xVerify) {
      console.error('Missing callback data:', { response: !!response, xVerify: !!xVerify });
      res.status(400).json({ success: false, message: 'Invalid callback data' });
      return;
    }

    // Verify callback authenticity
    const isValid = phonePeService.verifyCallback(xVerify, response);
    if (!isValid) {
      console.error('Callback signature verification failed');
      res.status(400).json({ success: false, message: 'Invalid callback signature' });
      return;
    }

    // Decode response
    let decodedResponse;
    try {
      const decodedString = Buffer.from(response, 'base64').toString('utf-8');
      decodedResponse = JSON.parse(decodedString);
      console.log('Decoded callback response:', decodedResponse);
    } catch (parseError) {
      console.error('Failed to decode callback response:', parseError);
      res.status(400).json({ success: false, message: 'Invalid response format' });
      return;
    }

    const merchantTransactionId = decodedResponse.data?.merchantTransactionId;

    if (!merchantTransactionId) {
      console.error('Missing merchantTransactionId in callback');
      res.status(400).json({ success: false, message: 'Missing transaction ID in callback' });
      return;
    }

    // Find payment record
    const payment = await Payment.findOne({ merchantTransactionId });
    if (!payment) {
      console.error('Payment record not found:', merchantTransactionId);
      res.status(404).json({ success: false, message: 'Payment record not found' });
      return;
    }

    // Update payment status based on PhonePe response
    const responseCode = decodedResponse.code;
    const state = decodedResponse.data?.state;

    // Map PhonePe status to our status
    if (responseCode === 'PAYMENT_SUCCESS' || state === 'COMPLETED') {
      payment.status = 'SUCCESS';
    } else if (responseCode === 'PAYMENT_PENDING' || state === 'PENDING') {
      payment.status = 'PENDING';
    } else {
      payment.status = 'FAILED';
    }

    payment.transactionId = decodedResponse.data?.transactionId;
    payment.responseCode = responseCode;
    payment.responseMessage = decodedResponse.message;
    payment.paymentInstrument = decodedResponse.data?.paymentInstrument;
    
    await payment.save();

    // Update order
    const order = await Order.findById(payment.orderId);
    if (order) {
      order.paymentId = payment._id;
      
      if (payment.status === 'SUCCESS') {
        order.paymentStatus = 'PAID';
        order.orderStatus = 'CONFIRMED';
      } else if (payment.status === 'FAILED') {
        order.paymentStatus = 'FAILED';
      }
      
      await order.save();
      console.log('Order updated:', order.orderNumber, order.paymentStatus);
    }

    res.status(200).json({ success: true, message: 'Callback processed successfully' });
  } catch (error: any) {
    console.error('Callback handling error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Callback processing failed',
      error: error.message 
    });
  }
};

/**
 * Check payment status
 */
export const checkStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { merchantTransactionId } = req.params;
    const user = (req as any).user as IUser;
    const userId = user?._id?.toString();

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Get payment from database
    const payment = await Payment.findOne({ merchantTransactionId, userId });
    if (!payment) {
      res.status(404).json({ success: false, message: 'Payment not found' });
      return;
    }

    // Check status from PhonePe
    const phonePeResponse = await phonePeService.checkPaymentStatus(merchantTransactionId);

    if (phonePeResponse.success && phonePeResponse.data) {
      // Map PhonePe state to our status
      const state = phonePeResponse.data.state;
      const responseCode = phonePeResponse.code;

      if (state === 'COMPLETED' || responseCode === 'PAYMENT_SUCCESS') {
        payment.status = 'SUCCESS';
      } else if (state === 'FAILED' || responseCode === 'PAYMENT_ERROR') {
        payment.status = 'FAILED';
      } else if (state === 'PENDING' || responseCode === 'PAYMENT_PENDING') {
        payment.status = 'PENDING';
      }

      payment.transactionId = phonePeResponse.data.transactionId || payment.transactionId;
      payment.responseCode = phonePeResponse.data.responseCode || phonePeResponse.code;
      payment.paymentInstrument = phonePeResponse.data.paymentInstrument || payment.paymentInstrument;
      await payment.save();

      // Update order if payment successful
      if (payment.status === 'SUCCESS' && payment.orderId) {
        const order = await Order.findById(payment.orderId);
        if (order && order.paymentStatus !== 'PAID') {
          order.paymentStatus = 'PAID';
          order.orderStatus = 'CONFIRMED';
          order.paymentId = payment._id;
          await order.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        status: payment.status,
        transactionId: payment.transactionId,
        amount: payment.amount,
        orderId: payment.orderId
      }
    });
  } catch (error: any) {
    console.error('Status check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to check status',
      error: error.message 
    });
  }
};

/**
 * Get user orders
 */
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user as IUser;
    const userId = user?._id?.toString();
    
    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('paymentId')
      .lean();

    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};

/**
 * Get order details
 */
export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const user = (req as any).user as IUser;
    const userId = user?._id?.toString();

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ success: false, message: 'Invalid order ID format' });
      return;
    }

    const order = await Order.findOne({ _id: orderId, userId })
      .populate('paymentId')
      .lean();
    
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    console.error('Get order details error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order details',
      error: error.message 
    });
  }
};

/**
 * Initiate refund
 */
export const initiateRefund = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const user = (req as any).user as IUser;
    const userId = user?._id?.toString();

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ success: false, message: 'Invalid order ID format' });
      return;
    }

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    // Check if already refunded first
    if (order.paymentStatus === 'REFUNDED') {
      res.status(400).json({ success: false, message: 'Order already refunded' });
      return;
    }

    // Then check if it's paid
    if (order.paymentStatus !== 'PAID') {
      res.status(400).json({ 
        success: false, 
        message: `Cannot refund order with payment status: ${order.paymentStatus}` 
      });
      return;
    }

    const payment = await Payment.findById(order.paymentId);
    if (!payment) {
      res.status(400).json({ success: false, message: 'Payment record not found' });
      return;
    }

    if (!payment.transactionId) {
      res.status(400).json({ 
        success: false, 
        message: 'Cannot refund - original transaction ID not found' 
      });
      return;
    }

    const refundTransactionId = generateTransactionId('REFUND');

    // Initiate refund with PhonePe
    const refundResponse = await phonePeService.initiateRefund(
      refundTransactionId,
      payment.transactionId,
      order.totalAmount
    );

    if (refundResponse.success) {
      order.paymentStatus = 'REFUNDED';
      order.orderStatus = 'CANCELLED';
      await order.save();

      payment.status = 'CANCELLED';
      payment.metadata = {
        ...payment.metadata,
        refundTransactionId,
        refundInitiatedAt: new Date()
      };
      await payment.save();

      res.status(200).json({
        success: true,
        message: 'Refund initiated successfully',
        data: {
          refundTransactionId,
          orderId: order._id,
          orderNumber: order.orderNumber,
          refundAmount: order.totalAmount
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Refund initiation failed',
        error: refundResponse.message
      });
    }
  } catch (error: any) {
    console.error('Refund error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to initiate refund',
      error: error.message 
    });
  }
};