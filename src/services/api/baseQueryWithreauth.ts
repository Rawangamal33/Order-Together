import type { RootState } from '@/app/store';
import { logoutRedux, setCredentials } from '@/features/auth/authSlice';
import type { RefreshResponse } from '@/types/auth.types';
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

  if (result?.meta?.response?.status === 401 && accessToken) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const id = (api.getState() as RootState).auth.user?.id;
    if (!refreshToken || !id) {
      toast.error('Session expired. Please login again.');
      api.dispatch(logoutRedux());
      await baseQuery(
        {
          url: '/auth/logout',
          method: 'POST',
          body: { userId: id, token: refreshToken },
        },
        api,
        extraOptions
      );
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
      const returnedResult = refreshResult?.data as RefreshResponse;
      const currentUser = (api.getState() as RootState).auth.user;

      api.dispatch(
        setCredentials({
          accessToken: returnedResult?.accessToken,
          refreshToken: returnedResult?.refreshToken,
          user: currentUser,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      toast.error('Session expired. Please login again.');
      api.dispatch(logoutRedux());
      await baseQuery(
        {
          url: '/auth/logout',
          method: 'POST',
          body: { userId: id, token: refreshToken },
        },
        api,
        extraOptions
      );
    }
  }
  return result;
};
