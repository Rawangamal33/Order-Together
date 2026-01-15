import { useCallback, useEffect, useMemo, useState } from 'react';
import z from 'zod';
import { useDialogContext } from '@/context/DialogProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFileUpload from '@/hooks/useFileUpload';
import {
  useGetRestaurantByShortCodeQuery,
  useUpdateRestaurantMutation,
} from '@/features/restuarants/restaurantsApi';
import Tooltip from '@mui/material/Tooltip';
import { MdDelete } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import {
  logoUrlSchema,
  restaurantNameSchema,
} from '@/features/restuarants/schemas/restaurants.schema';
import ErrToastHandler from '../ErrorHandlers/ErrToastHandler';
import FormButtonActions from '../ui/FormButtonActions';
import FileUploadCom from '../ui/FileUploadCom';

export interface EditRestaurantProps {
  id: string;
  shortCode: string;
  isVisible: boolean;
}

const EditRestaurant = ({ id, shortCode, isVisible }: EditRestaurantProps) => {
  const { setIsOpen } = useDialogContext();
  const { data, isLoading: isLoadingDetails } =
    useGetRestaurantByShortCodeQuery(shortCode);
  const [updateRestaurant, { isLoading: isUpdating }] =
    useUpdateRestaurantMutation();
  const {
    uploadFile,
    isLoading: isUploadingFile,
    error: fileUploadErr,
  } = useFileUpload();
  const [previewLogo, setPreviewLogo] = useState('');

  const Schema = useMemo(() => {
    return z.object({
      name: restaurantNameSchema,
      logoUrl: logoUrlSchema,
      isVisible: z.boolean(),
    });
  }, []);

  type FormData = z.infer<typeof Schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!data) return;
    if (data) {
      reset({
        name: data.name,
        logoUrl: data.logoUrl ?? undefined,
        isVisible,
      });
      if (data.logoUrl) {
        setPreviewLogo(data.logoUrl);
      }
    }
  }, [data, reset]);

  const handleUploadFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;
      const url = await uploadFile(selectedFile);
      setPreviewLogo(url);
      reset({ ...data, logoUrl: url });
    },
    [uploadFile]
  );

  const onSubmit = async (data: FormData) => {
    try {
      await updateRestaurant({
        id,
        name: data.name.trim(),
        isVisible: data.isVisible,
        logoUrl: data.logoUrl,
      }).unwrap();
      toast.success('Restaurant Updated Successfully.');
      setIsOpen(false);
      reset();
    } catch (err: any) {
      ErrToastHandler(err);
    }
  };
  if (isLoadingDetails) {
    return (
      <div className='flex-center min-h-screen'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <form
      className='mt-6 flex flex-col gap-2 text-gray-700'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor='name' className='labelStyles text-[14px]'>
        Restaurant Name
      </label>
      <input
        type='text'
        id='name'
        {...register('name')}
        autoFocus
        placeholder="e.g. Papa John's"
        className='inputStyles text-[13px]'
      />
      {errors.name && (
        <span className='text-red-600 text-sm'>{errors.name.message}</span>
      )}

      <div className='flex justify-between items-center mt-2'>
        <label className='text-[14px] mt-2'>Logo</label>
        {previewLogo && (
          <Tooltip title='Delete'>
            <IconButton
              size='small'
              sx={{
                color: '#DC2626',
                '&:hover': {
                  background: '#fee2e2',
                },
              }}
              onClick={() => {
                setPreviewLogo('');
                reset({ ...data, logoUrl: undefined });
              }}
            >
              <MdDelete />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <FileUploadCom
        previewLogo={previewLogo}
        isUploading={isUploadingFile}
        fileUploadErr={fileUploadErr}
        handleUploadFile={handleUploadFile}
      />
      <div className='flex items-center gap-1.5 mt-1.5'>
        <input
          type='checkbox'
          id='visible'
          {...register('isVisible')}
          className='accent-blue-600'
        />
        <label htmlFor='visible' className='text-[14px]'>
          Visible to Users
        </label>
      </div>

      <FormButtonActions
        onClose={() => setIsOpen(false)}
        isValid={isValid}
        isLoading={isUpdating}
        isUploadingFile={isUploadingFile}
        loadingLabel='Saving...'
        submitLabel='Save Changes'
      />
    </form>
  );
};

export default EditRestaurant;
