import { api } from '@/services/api/api';
import type { Restaurant } from '@/types/restaurants.types';

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'admin/restaurants',
      providesTags: ['Restaurants'],
    }),
  }),
});

export const { useGetRestaurantsQuery } = restaurantApi;
