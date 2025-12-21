import { useUploadFileMutation } from '@/features/media/mediaApi';

const useFileUpload = () => {
  const [postUploadFile, { isLoading, isError, error }] =
    useUploadFileMutation();
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return await postUploadFile(formData).unwrap();
  };
  return { uploadFile, isLoading, isError, error };
};

export default useFileUpload;
