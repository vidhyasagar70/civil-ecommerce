import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from './types/productTypes';
// Use Vite's import.meta.env instead of process.env
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${apiBaseUrl}/api/products`,
});

export const useProducts = (params?: {
  search?: string;
  category?: string;
  company?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery<{
    products: Product[];
    totalPages: number;
    currentPage: number;
    total: number;
  }>({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/', { params });
      return data;
    },
  });
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apiClient.get('/categories');
      return data;
    },
  });
}

export const useCompanies = () => {
  return useQuery<string[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data } = await apiClient.get('/companies');
      return data;
    },
  });
}

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