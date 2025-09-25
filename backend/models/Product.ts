import mongoose, { Document, Schema } from 'mongoose';

interface SubscriptionDuration {
  duration: string;
  price: number;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface IProduct extends Document {
  name: string;
  version: string;
  shortDescription?: string;
  description: string;
  overallFeatures?: string;
  requirements?: string;
  category: string;
  company: string; // Will map to brand in frontend
  brand?: string; // New field for brand
  price1: number; // Backward compatibility
  price3?: number; // Backward compatibility
  priceLifetime?: number; // Backward compatibility
  subscriptionDurations?: SubscriptionDuration[];
  hasLifetime?: boolean;
  lifetimePrice?: number;
  hasMembership?: boolean;
  membershipPrice?: number;
  image: string; // Will map to imageUrl in frontend
  imageUrl?: string; // New field for main image
  additionalImages?: string[];
  videoUrl?: string;
  activationVideoUrl?: string;
  status?: 'active' | 'inactive' | 'draft';
  isBestSeller?: boolean;
  faqs?: FAQ[];
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionDurationSchema = new Schema({
  duration: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    version: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String, required: true },
    overallFeatures: { type: String },
    requirements: { type: String },
    category: { type: String, required: true },
    company: { type: String, required: true }, // Backward compatibility
    brand: { type: String }, // New field
    price1: { type: Number, required: true }, // Backward compatibility
    price3: { type: Number }, // Backward compatibility
    priceLifetime: { type: Number }, // Backward compatibility
    subscriptionDurations: [subscriptionDurationSchema],
    hasLifetime: { type: Boolean, default: false },
    lifetimePrice: { type: Number },
    hasMembership: { type: Boolean, default: false },
    membershipPrice: { type: Number },
    image: { type: String, required: true }, // Backward compatibility
    imageUrl: { type: String }, // New field
    additionalImages: [{ type: String }],
    videoUrl: { type: String },
    activationVideoUrl: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active'
    },
    isBestSeller: { type: Boolean, default: false },
    faqs: [faqSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
