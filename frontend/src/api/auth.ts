import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const signUp = async (
  email: string,
  password: string,
  fullName?: string,
  phoneNumber?: string
): Promise<AuthResponse> => {
  const response = await api.post('/register', {
    email,
    password,
    fullName,
    phoneNumber,
  });
  return response.data;
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
};

export const googleAuth = (): void => {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
};