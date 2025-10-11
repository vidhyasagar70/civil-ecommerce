import axios from 'axios';
import { phonePeConfig } from '../config/phonepe';
import { generateChecksum, verifyChecksum } from '../utils/crypto';
import { PhonePePaymentRequest, PhonePeResponse } from '../types/payment.types';

class PhonePeService {
  private config = phonePeConfig;

  /**
   * Initiate payment with PhonePe
   */
  async initiatePayment(paymentData: PhonePePaymentRequest): Promise<PhonePeResponse> {
    try {
      // Create base64 payload
      const payload = {
        merchantId: this.config.merchantId,
        merchantTransactionId: paymentData.merchantTransactionId,
        merchantUserId: paymentData.merchantUserId,
        amount: paymentData.amount * 100, // Convert to paise
        redirectUrl: paymentData.redirectUrl,
        redirectMode: paymentData.redirectMode,
        callbackUrl: paymentData.callbackUrl,
        mobileNumber: paymentData.mobileNumber,
        paymentInstrument: paymentData.paymentInstrument
      };

      const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
      const endpoint = '/pg/v1/pay';
      const xVerify = generateChecksum(
        base64Payload,
        endpoint,
        this.config.saltKey,
        this.config.saltIndex
      );

      // Make API request
      const response = await axios.post(
        `${this.config.hostUrl}${endpoint}`,
        {
          request: base64Payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('PhonePe payment initiation error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment initiation failed');
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(merchantTransactionId: string): Promise<PhonePeResponse> {
    try {
      const endpoint = `/pg/v1/status/${this.config.merchantId}/${merchantTransactionId}`;
      const xVerify = generateChecksum(
        '',
        endpoint,
        this.config.saltKey,
        this.config.saltIndex
      );

      const response = await axios.get(
        `${this.config.hostUrl}${endpoint}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('PhonePe status check error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Status check failed');
    }
  }

  /**
   * Verify callback from PhonePe
   */
  verifyCallback(xVerify: string, response: string): boolean {
    try {
      return verifyChecksum(
        xVerify,
        response,
        this.config.saltKey,
        this.config.saltIndex
      );
    } catch (error) {
      console.error('Callback verification error:', error);
      return false;
    }
  }

  /**
   * Initiate refund
   */
  async initiateRefund(
    merchantTransactionId: string,
    originalTransactionId: string,
    amount: number
  ): Promise<PhonePeResponse> {
    try {
      const payload = {
        merchantId: this.config.merchantId,
        merchantTransactionId,
        originalTransactionId,
        amount: amount * 100, // Convert to paise
        callbackUrl: this.config.callbackUrl
      };

      const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
      const endpoint = '/pg/v1/refund';
      const xVerify = generateChecksum(
        base64Payload,
        endpoint,
        this.config.saltKey,
        this.config.saltIndex
      );

      const response = await axios.post(
        `${this.config.hostUrl}${endpoint}`,
        {
          request: base64Payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('PhonePe refund error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Refund initiation failed');
    }
  }
}

export default new PhonePeService();