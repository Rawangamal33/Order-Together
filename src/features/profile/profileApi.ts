import { api } from '@/services/api/api';
import type {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/features/profile/types/profile.types';

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => 'users/me',
      providesTags: ['profile'],
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: 'users/me',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(updatedDataObject, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getProfile', undefined, (draft) => {
            Object.assign(draft.user, updatedDataObject);
          })
        );
        queryFulfilled.catch(() => patchResult.undo());
      },
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
