import { useDialogContext } from '@/context/DialogProvider';
import { useCallback, useMemo, useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFileUpload from '@/hooks/useFileUpload';
import { usePostRestaurantMutation } from '@/features/restuarants/restaurantsApi';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from 'react-icons/md';
import { restaurantNameSchema } from '@/features/restuarants/schemas/restaurants.schema';
import ErrToastHandler from '../ErrorHandlers/ErrToastHandler';
import FormButtonActions from '../ui/FormButtonActions';
import FileUploadCom from '../ui/FileUploadCom';

const CreateRestaurant = () => {
  const { setIsOpen } = useDialogContext();
  const [postRestaurant, { isLoading: isCreatingRestaurant }] =
    usePostRestaurantMutation();
  const {
    uploadFile,
    isLoading: isUploadingFile,
    error: fileUploadErr,
  } = useFileUpload();
  const [previewLogo, setPreviewLogo] = useState('');

  const schema = useMemo(() => {
    return z.object({
      name: restaurantNameSchema,
      isVisible: z.boolean(),
    });
  }, []);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isVisible: true,
    },
    mode: 'onChange',
  });

  const handleUploadFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;
      const url = await uploadFile(selectedFile);
      setPreviewLogo(url);
    },
    [uploadFile]
  );

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        name: data.name.trim(),
        ...(previewLogo && { logoUrl: previewLogo }),
      };
      await postRestaurant(payload).unwrap();
      toast.success('Restaurant Created Successfully.');
      setIsOpen(false);
      reset();
    } catch (err: any) {
      ErrToastHandler(err);
    }
  };

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

      <div className='flex justify-between items-center'>
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
        isLoading={isCreatingRestaurant}
        isUploadingFile={isUploadingFile}
        loadingLabel='Creating...'
        submitLabel='Create Restaurant'
      />
    </form>
  );
};

export default CreateRestaurant;
