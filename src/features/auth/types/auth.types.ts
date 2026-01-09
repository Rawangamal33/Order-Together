export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatarUrl: string | null;
  role: string[];
}

export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  user: User;
}

export interface InitialStateProps {
  accessToken: string | null;
  user: User;
}

export interface CredentialsType extends InitialStateProps {}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RefreshRequest {
  token: string | null;
}

export interface LogoutRequest extends RefreshRequest {}
