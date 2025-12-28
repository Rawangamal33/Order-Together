import { api } from '@/services/api/api';
import type {
  GetRestaurantByShortCodeResponse,
  Restaurant,
  RestaurantRequest,
  UpdateRestaurantRequest,
  UpdateRestaurantResponse,
} from '@/types/restaurants.types';

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'admin/restaurants',
      providesTags: ['Restaurants'],
    }),
    postRestaurant: builder.mutation<void, RestaurantRequest>({
      query: (body) => ({
        url: 'admin/restaurants',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Restaurants'],
    }),
    getRestaurantByShortCode: builder.query<
      GetRestaurantByShortCodeResponse,
      string
    >({
      query: (shortCode) => `restaurants/${shortCode}`,
      providesTags: ['Restaurants'],
    }),
    updateRestaurant: builder.mutation<
      UpdateRestaurantResponse,
      UpdateRestaurantRequest
    >({
      query: ({ id, ...body }) => ({
        url: `admin/restaurants/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Restaurants'],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  usePostRestaurantMutation,
  useGetRestaurantByShortCodeQuery,
  useUpdateRestaurantMutation,
} = restaurantApi;
