import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

// Create new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products with search and filter
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, company, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } },
        { version: { $regex: search as string, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = { $regex: category as string, $options: 'i' };
    }
    
    if (company) {
      filter.company = { $regex: company as string, $options: 'i' };
    }

    const products: IProduct[] = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get unique categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get unique companies
export const getCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Product.distinct('company');
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product by id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
