import { api } from '@/services/api/api';
import type {
  GetMenuItemsResponse,
  PostMenuItemRequest,
} from '@/types/menuItems.types';

const menuItemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query<GetMenuItemsResponse, string>({
      query: (id) => `admin/restaurants/${id}/menu-items`,
      providesTags: ['MenuItems'],
    }),
    postMenuItem: builder.mutation<void, PostMenuItemRequest>({
      query: ({ id, ...body }) => ({
        url: `admin/restaurants/${id}/menu-items`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MenuItems'],
    }),
  }),
});

export const { useGetMenuItemsQuery, usePostMenuItemMutation } = menuItemsApi;
