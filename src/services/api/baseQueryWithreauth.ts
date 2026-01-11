import type { RootState } from '@/app/store';
import { logoutRedux, setCredentials } from '@/features/auth/authSlice';
import { api as apiSlice } from './api';
import type { RefreshResponse } from '@/features/auth/types/auth.types';
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const accessToken = (api.getState() as RootState).auth.accessToken;
  const refreshToken = (api.getState() as RootState).auth.refreshToken;
  if (result?.meta?.response?.status === 401 && accessToken) {
    console.log('Token expired, attempting refresh...');

    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: {
          token: refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log('Token refreshed successfully');
      const returnedResult = refreshResult.data as RefreshResponse;

      api.dispatch(setCredentials(returnedResult));

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Refresh failed, logging out');
      toast.error('Session expired. Please login again.');
      await baseQuery(
        {
          url: 'auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        },
        api,
        extraOptions
      );
      api.dispatch(logoutRedux());
      api.dispatch(apiSlice.util.resetApiState());
    }
  }

  return result;
};
