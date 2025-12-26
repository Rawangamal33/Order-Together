import { api } from '@/services/api/api';
import type { Restaurant, RestaurantRequest } from '@/types/restaurants.types';

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
  }),
});

export const { useGetRestaurantsQuery, usePostRestaurantMutation } =
  restaurantApi;
