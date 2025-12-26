import { BsFillImageFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import { useDialogContext } from '@/context/DialogProvider';
import { useMemo, useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFileUpload from '@/hooks/useFileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { usePostRestaurantMutation } from '@/features/restuarants/restaurantsApi';
import { toast } from 'react-toastify';

const CreateRestaurant = () => {
  const { setIsOpen } = useDialogContext();
  const [postRestaurant, { isLoading: isCreatingRestaurant }] =
    usePostRestaurantMutation();
  const {
    uploadFile,
    isLoading: isUploadingFile,
    isError: isFileUploadErr,
    error: fileUploadErr,
  } = useFileUpload();
  const [previewLogo, setPreviewLogo] = useState('');

  const schema = useMemo(() => {
    const restaurantNameSchema = z
      .string()
      .min(3, {
        message: 'Restaurant name must be at least 3 characters long.',
      })
      .max(50, { message: 'Restaurant name must not exceed 50 characters.' })
      .regex(/^[\p{L}0-9\s&\-\.'\/() +]+$/u, {
        message:
          "Name contains invalid characters. Allowed: Arabic/English letters, numbers, and & - . ' / ( ) +",
      })
      .refine((val) => val.trim().length > 0, {
        message: 'Restaurant name cannot be empty or whitespace only.',
      });

    return z.object({
      name: restaurantNameSchema,
      isVisible: z.boolean(),
    });
  }, []);

  type FormData = z.infer<typeof schema>;

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const url = await uploadFile(selectedFile);
    setPreviewLogo(url);
  };

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
      if (!err?.data) {
        toast.error('Please check Network Connection.');
      } else if (err?.data?.status === 409) {
        toast.error(err.data.title);
      } else if (err?.data?.status === 400) {
        toast.error(err.data.title);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
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

      <label className='text-[14px] mt-2'>Logo</label>
      <label
        htmlFor='upload-image'
        className={`w-full mx-auto h-32 flex flex-col items-center justify-center gap-2 ${
          !previewLogo &&
          'border-2 border-dashed rounded-md border-gray-300 bg-[#F9FAFB]'
        }`}
      >
        {isUploadingFile ? (
          <CircularProgress size={40} color='primary' />
        ) : previewLogo ? (
          <img
            src={previewLogo}
            className='max-h-24 max-w-full object-contain rounded-lg'
            alt='Restaurant logo preview'
          />
        ) : (
          <>
            <div className='text-[23px] text-[#9CA3AF]'>
              <BsFillImageFill />
            </div>
            <p className='text-xs text-[#6B7280]'>
              Click to upload (.jpg, .png, and .webp).
            </p>
          </>
        )}
      </label>

      <input
        type='file'
        name='file'
        id='upload-image'
        className='hidden'
        accept='.jpg, .png, .jpeg, .webp'
        onChange={handleUploadFile}
      />
      {isFileUploadErr && (
        <div className='text-red-600 text-sm'>
          {(fileUploadErr as any).data.title ||
            'File upload failed. Please Try again.'}
        </div>
      )}

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

      <div className='flex justify-between items-center mt-4'>
        <Button
          variant='outline'
          type='button'
          className='border-gray-300'
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          size={'sm'}
          variant='destructive'
          disabled={!isValid || isUploadingFile || isCreatingRestaurant}
          className={
            !isValid || isCreatingRestaurant
              ? 'opacity-75 cursor-not-allowed'
              : ''
          }
        >
          {isCreatingRestaurant ? 'Creating...' : 'Create Restaurant'}
        </Button>
      </div>
    </form>
  );
};

export default CreateRestaurant;
