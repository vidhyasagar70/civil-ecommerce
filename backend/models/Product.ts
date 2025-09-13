import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  version: string;
  description: string;
  category: string;
  company: string;
  price1: number;
  price3?: number;
  priceLifetime?: number;
  image: string;
  additionalImages?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    price1: { type: Number, required: true },
    price3: { type: Number },
    priceLifetime: { type: Number },
    image: { type: String, required: true },
    additionalImages: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
