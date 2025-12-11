import { api } from '@/services/api/api';
import {
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
} from '@/types/auth.types';

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
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;
