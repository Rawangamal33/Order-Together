// import type { RootState } from '@/app/store';
// import {
//   fetchBaseQuery,
//   type BaseQueryFn,
//   type FetchArgs,
//   type FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';

// export const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_URL,
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const accessToken = (getState() as RootState).auth.accessToken;
//     if (accessToken) {
//       headers.set('authorization', `Bearer ${accessToken}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithreauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
//   console.log(result);
//   return result;
// };
