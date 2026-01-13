import { api } from '@/services/api/api';
import type {
  GetMenuDetailsByIdResponse,
  GetMenuItemsResponse,
  PostMenuItemRequest,
  UpdateMenuItemRequest,
  UpdateMenuItemResponse,
  updateMenuItemVisibilityRequest,
} from '@/features/menuItems/types/menuItems.types';

const menuItemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query<GetMenuItemsResponse, string>({
      query: (id) => `admin/restaurants/${id}/menu-items`,
      providesTags: (result) =>
        result
          ? [
              { type: 'MenuItems', id: 'LIST' },
              ...result.menuItems.map(({ id }) => ({
                type: 'MenuItems' as const,
                id,
              })),
            ]
          : [{ type: 'MenuItems', id: 'LIST' }],
    }),
    postMenuItem: builder.mutation<void, PostMenuItemRequest>({
      query: ({ id, ...body }) => ({
        url: `admin/restaurants/${id}/menu-items`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'MenuItems', id: 'LIST' }],
    }),
    GetMenuDetailsById: builder.query<GetMenuDetailsByIdResponse, string>({
      query: (id) => `admin/menu-items/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MenuItems', id }],
    }),
    updateMenuItem: builder.mutation<
      UpdateMenuItemResponse,
      UpdateMenuItemRequest
    >({
      query: ({ id, ...body }) => ({
        url: `admin/menu-items/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'MenuItems', id }],
    }),
    updateMenuItemVisibility: builder.mutation<
      void,
      updateMenuItemVisibilityRequest
    >({
      query: ({ id, ...body }) => ({
        url: `admin/menu-items/${id}/visibility`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'MenuItems', id },
        { type: 'MenuItems', id: 'LIST' },
      ],
    }),
    deleteMenuItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/menu-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'MenuItems', id },
        { type: 'MenuItems', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  usePostMenuItemMutation,
  useGetMenuDetailsByIdQuery,
  useUpdateMenuItemMutation,
  useUpdateMenuItemVisibilityMutation,
  useDeleteMenuItemMutation,
} = menuItemsApi;
