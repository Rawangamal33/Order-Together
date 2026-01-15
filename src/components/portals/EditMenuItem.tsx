import { useDialogContext } from '@/context/DialogProvider';
import { useEffect, useMemo } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import ErrToastHandler from '../ErrorHandlers/ErrToastHandler';
import FormButtonActions from '../ui/FormButtonActions';

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

      <FormButtonActions
        onClose={() => setIsOpen(false)}
        isValid={isValid}
        isLoading={isUpdating}
        loadingLabel='Saving...'
        submitLabel='Save Changes'
      />
    </form>
  );
};

export default EditMenuItem;
