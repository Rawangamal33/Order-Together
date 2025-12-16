export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatrUrl: string | null;
  role: string[];
}

export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  user: User;
}

export interface InitialStateProps extends LoginResponse {}

export interface CredentialsType extends LoginResponse {}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  userId: string;
  token: string;
}

export interface LogoutRequest extends RefreshRequest {}
