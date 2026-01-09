import { api } from '@/services/api/api';
import {
  type LoginRequest,
  type LoginResponse,
  type LogoutRequest,
  type RefreshRequest,
  type RefreshResponse,
  type RegisterRequest,
} from '@/features/auth/types/auth.types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    postRegister: builder.mutation<string, RegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (body) => ({
        url: 'auth/refresh',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, LogoutRequest>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  usePostLoginMutation,
  usePostRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
