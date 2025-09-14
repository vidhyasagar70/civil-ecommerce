export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}
