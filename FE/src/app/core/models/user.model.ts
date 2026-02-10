export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  role?: 'USER' | 'ADMIN';
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
