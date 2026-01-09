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
    GetMenuDetailsById: builder.query<GetMenuDetailsByIdResponse, string>({
      query: (id) => `admin/menu-items/${id}`,
      providesTags: ['MenuItems'],
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
      invalidatesTags: ['MenuItems'],
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
      invalidatesTags: ['MenuItems'],
    }),
    deleteMenuItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/menu-items/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['MenuItems'],
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
