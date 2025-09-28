import mongoose, { Document, Schema } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  description?: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  linkUrl?: string;
  ctaButtonText: string;
  startDate: Date;
  endDate: Date;
  position: 'Home Page Only' | 'Product Page' | 'Both';
  bannerType: 'Normal' | 'Festival' | 'Flash Sale' | 'Seasonal';
  priority: number;
  status: 'Active' | 'Inactive' | 'Scheduled';
  createdAt: Date;
  updatedAt: Date;
  isActive: () => boolean;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    desktopImageUrl: {
      type: String,
      required: [true, 'Desktop image URL is required'],
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Desktop image URL must be a valid URL'
      }
    },
    mobileImageUrl: {
      type: String,
      required: [true, 'Mobile image URL is required'],
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Mobile image URL must be a valid URL'
      }
    },
    linkUrl: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Link URL must be a valid URL'
      }
    },
    ctaButtonText: {
      type: String,
      required: true,
      default: 'Shop Now',
      maxlength: [50, 'CTA button text cannot exceed 50 characters']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function(this: IBanner, endDate: Date) {
          return endDate > this.startDate;
        },
        message: 'End date must be after start date'
      }
    },
    position: {
      type: String,
      enum: {
        values: ['Home Page Only', 'Product Page', 'Both'],
        message: '{VALUE} is not a valid position'
      },
      required: true,
      default: 'Home Page Only'
    },
    bannerType: {
      type: String,
      enum: {
        values: ['Normal', 'Festival', 'Flash Sale', 'Seasonal'],
        message: '{VALUE} is not a valid banner type'
      },
      required: true,
      default: 'Normal'
    },
    priority: {
      type: Number,
      required: true,
      min: [1, 'Priority must be at least 1'],
      max: [10, 'Priority cannot exceed 10'],
      default: 1
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive', 'Scheduled'],
        message: '{VALUE} is not a valid status'
      },
      required: true,
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient querying
BannerSchema.index({ status: 1, startDate: 1, endDate: 1 });
BannerSchema.index({ position: 1, status: 1, priority: -1 });

// Instance method to check if banner is currently active
BannerSchema.methods.isActive = function(): boolean {
  const now = new Date();
  return this.status === 'Active' && 
         this.startDate <= now && 
         this.endDate >= now;
};

// Static method to get active banners
BannerSchema.statics.getActiveBanners = function(position?: string) {
  const now = new Date();
  const query: any = {
    status: 'Active',
    startDate: { $lte: now },
    endDate: { $gte: now }
  };
  
  if (position && position !== 'Both') {
    query.$or = [
      { position: position },
      { position: 'Both' }
    ];
  }
  
  return this.find(query).sort({ priority: -1, createdAt: -1 });
};

export default mongoose.model<IBanner>('Banner', BannerSchema);