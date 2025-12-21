import { api } from '@/services/api/api';
import type { MediaFileUploadResponse } from '@/types/media.types';

export const mediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<MediaFileUploadResponse, FormData>({
      query: (formData) => ({
        url: 'media/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = mediaApi;
