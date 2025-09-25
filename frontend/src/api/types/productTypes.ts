export interface SubscriptionDuration {
  duration: string;
  price: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  _id?: string;
  name: string;
  version: string;
  shortDescription?: string;
  description: string;
  overallFeatures?: string;
  requirements?: string;
  category: string;
  company: string; // Backward compatibility
  brand?: string; // New field
  price1?: number | undefined; // Backward compatibility
  price3?: number | undefined; // Backward compatibility
  priceLifetime?: number | undefined; // Backward compatibility
  subscriptionDurations?: SubscriptionDuration[];
  hasLifetime?: boolean;
  lifetimePrice?: number;
  hasMembership?: boolean;
  membershipPrice?: number;
  oldPrice1?: number;
  oldPrice3?: number;
  oldPriceLifetime?: number;
  rating?: number;
  ratingCount?: number;
  tags?: string[];
  image: string; // Backward compatibility
  imageUrl?: string; // New field
  additionalImages?: string[];
  videoUrl?: string;
  activationVideoUrl?: string;
  status?: 'active' | 'inactive' | 'draft';
  isBestSeller?: boolean;
  faqs?: FAQ[];
  createdAt?: string;
  updatedAt?: string;
}