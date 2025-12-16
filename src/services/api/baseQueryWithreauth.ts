import type { RootState } from '@/app/store';
import { setCredentials } from '@/features/auth/authSlice';
import type { CredentialsType } from '@/types/auth.types';
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
  console.log(result);

  if (result?.meta?.response?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const id = (api.getState() as RootState).auth.user?.id;
    if (!refreshToken || !id) {
      toast.error('Session expired. Please login again.');
      // logout redux state will be added later
      return result;
    }
    const refreshResult = await baseQuery(
      {
        url: 'auth/refreshToken',
        method: 'POST',
        body: {
          userId: id,
          token: refreshToken,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const returnedResult = refreshResult?.data as CredentialsType;
      api.dispatch(setCredentials(returnedResult));
      result = await baseQuery(args, api, extraOptions);
    } else {
      toast.error('Session expired. Please login again.');
      // logout redux state will be added later
    }
  }
  return result;
};
