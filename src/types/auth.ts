export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state?: string;
  category?: string;
  role?: 'citizen' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface SignInData {
  identifier: string; // Email or Username
  password?: string;
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  state?: string;
  category?: string;
}
