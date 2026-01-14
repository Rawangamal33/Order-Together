import { usePostMenuItemMutation } from '@/features/menuItems/menuItemsApi';
import { useDialogContext } from '@/context/DialogProvider';
import { useMemo } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  descriptionMenuSchema,
  menuNameSchema,
  priceMenuSchema,
} from '@/features/menuItems/schemas/menuItems.schema';
import ErrToastHandler from '../Handlers/ErrToastHandler';
import FormButtonActions from '../ui/FormButtonActions';

const AddMenuItem = ({ id }: { id: string }) => {
  const { setIsOpen } = useDialogContext();

  const [postMenuItem, { isLoading }] = usePostMenuItemMutation();

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
    defaultValues: {
      isVisible: true,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await postMenuItem({
        id,
        name: data.name.trim(),
        price: data.price,
        description: data.description,
        isVisible: data.isVisible,
      }).unwrap();
      toast.success('Item Addes Successfully.');
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
        isLoading={isLoading}
        loadingLabel='Creating...'
        submitLabel='Create Item'
      />
    </form>
  );
};

export default AddMenuItem;
