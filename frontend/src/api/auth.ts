import axios from "axios";
import { saveAuth } from "../ui/utils/auth";
import type { AuthResponse } from "./types/auth";


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// 🔑 Email/Password Login
export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/api/auth/login", {
      email,
      password,
    });

    if (response.data.token && response.data.user) {
      saveAuth({
        token: response.data.token,
        email: response.data.user.email,
        role: response.data.user.role || "user",
      });
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// 🔑 Google Login (Step 1)
export const getGoogleAuthUrl = (): string =>
  `${apiBaseUrl}/api/auth/google`;

// 🔑 Google Login (Step 2)
export const handleGoogleCallback = async (
  code: string
): Promise<AuthResponse> => {
  try {
    const response = await api.get<AuthResponse>(
      `/api/auth/google/callback?code=${code}`
    );

    if (response.data.token && response.data.user) {
      saveAuth({
        token: response.data.token,
        email: response.data.user.email,
        role: response.data.user.role || "user",
      });
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
