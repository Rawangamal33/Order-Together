import { useDialogContext } from '@/context/DialogProvider';
import { useEffect, useMemo } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  useGetMenuDetailsByIdQuery,
  useUpdateMenuItemMutation,
} from '@/features/menuItems/menuItemsApi';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import {
  descriptionMenuSchema,
  menuNameSchema,
  priceMenuSchema,
} from '@/features/menuItems/schemas/menuItems.schema';

const EditMenuItem = ({ id }: { id: string }) => {
  const { data, isLoading: isLoadingDetails } = useGetMenuDetailsByIdQuery(id);
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuItemMutation();
  const { setIsOpen } = useDialogContext();

  const menuSchema = useMemo(() => {
    return z.object({
      name: menuNameSchema,
      price: priceMenuSchema,
      description: descriptionMenuSchema,
      isVisible: z.boolean(),
    });
  }, []);

  type FormData = z.infer<typeof menuSchema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(menuSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        description: data.description || '',
        isVisible: data.isVisible,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateMenu({
        id,
        name: data.name,
        price: data.price,
        description: data.description,
        isVisible: data.isVisible,
      }).unwrap();
      toast.success('Menu Item Updated Successfully.');
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
        Item Name
      </label>
      <input
        type='text'
        id='name'
        autoFocus
        {...register('name')}
        placeholder='e.g. Secret Burger'
        className='inputStyles text-[13px]'
      />
      {errors.name && (
        <span className='text-sm text-red-600'>{errors.name.message}</span>
      )}

      <label htmlFor='price' className='labelStyles text-[14px]'>
        Price (EGP)
      </label>
      <input
        type='number'
        id='price'
        step='0.01'
        min='0'
        {...register('price', {
          valueAsNumber: true,
        })}
        placeholder='0.00'
        className='inputStyles text-[13px]'
      />
      {errors.price && (
        <span className='text-sm text-red-600'>{errors.price.message}</span>
      )}

      <label htmlFor='description' className='labelStyles text-[14px]'>
        Description
      </label>
      <textarea
        id='description'
        {...register('description')}
        placeholder='Ingredients, details...'
        className='inputStyles text-[13px]'
      />
      {errors.description && (
        <span className='text-sm text-red-600'>
          {errors.description.message}
        </span>
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
          disabled={!isValid || isUpdating}
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default EditMenuItem;
