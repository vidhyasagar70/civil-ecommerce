export interface Product {
  _id?: string;
  name: string;
  version: string;
  description: string;
  category: string;
  company: string;
  price1: number;
  price3?: number;
  priceLifetime?: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}