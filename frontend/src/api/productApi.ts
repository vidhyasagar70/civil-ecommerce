import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Use Vite's import.meta.env instead of process.env
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${apiBaseUrl}/api/products`,
});

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

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await apiClient.get('/');
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: Product) => {
      const { data } = await apiClient.post('/', newProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedProduct }: { id: string; updatedProduct: Product }) => {
      const { data } = await apiClient.put(`/${id}`, updatedProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};