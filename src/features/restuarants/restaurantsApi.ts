import { api } from '@/services/api/api';
import type {
  GetRestaurantByShortCodeResponse,
  Restaurant,
  RestaurantRequest,
  UpdateRestaurantRequest,
  UpdateRestaurantResponse,
  UpdateRestVisibility,
} from '@/features/restuarants/types/restaurants.types';

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'admin/restaurants',
      providesTags: (result) =>
        result
          ? [
              { type: 'Restaurants', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Restaurants' as const, id })),
            ]
          : [{ type: 'Restaurants', id: 'LIST' }],
    }),
    postRestaurant: builder.mutation<void, RestaurantRequest>({
      query: (body) => ({
        url: 'admin/restaurants',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'LIST' }],
    }),
    getRestaurantByShortCode: builder.query<
      GetRestaurantByShortCodeResponse,
      string
    >({
      query: (shortCode) => `restaurants/${shortCode}`,
      providesTags: (result) =>
        result ? [{ type: 'Restaurants', id: result.id }] : [],
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
      invalidatesTags: (_result, _error, updatedRes) => [
        { type: 'Restaurants', id: updatedRes.id },
      ],
    }),
    updateRestaurantVisibility: builder.mutation<void, UpdateRestVisibility>({
      query: ({ id, isVisible }) => ({
        url: `admin/restaurants/${id}/visibility`,
        method: 'PATCH',
        body: { isVisible },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Restaurants', id },
        {
          type: 'Restaurants',
          id: 'LIST',
        },
      ],
    }),
    DeleteRestaurant: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/restaurants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Restaurants', id },
        { type: 'Restaurants', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  usePostRestaurantMutation,
  useGetRestaurantByShortCodeQuery,
  useUpdateRestaurantVisibilityMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
