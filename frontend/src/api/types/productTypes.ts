export interface Product {
  _id?: string;
  name: string;
  version: string;
  description: string;
  category: string;
  company: string;
  price1?: number | undefined;
  price3?: number | undefined;
  priceLifetime?: number | undefined;
  oldPrice1?: number;
  oldPrice3?: number;
  oldPriceLifetime?: number;
  rating?: number;
  ratingCount?: number;
  tags?: string[];
  image: string;
  additionalImages?: string[];
  createdAt?: string;
  updatedAt?: string;
}