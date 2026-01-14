import type { AppDispatch } from '@/app/store';
import ErrToastHandler from '@/components/Handlers/ErrToastHandler';
import { Button } from '@/components/ui/button';
import ErrorPage from '@/components/ui/ErrorPage';
import FormButtonActions from '@/components/ui/FormButtonActions';
import { updateUser } from '@/features/auth/authSlice';
import { userNameSchema } from '@/features/auth/schemas/auth.schema';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/profile/profileApi';
import { logoUrlSchema } from '@/features/restuarants/schemas/restaurants.schema';
import useFileUpload from '@/hooks/useFileUpload';
import { getInitials } from '@/lib/ImgPlaceholder-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import z from 'zod';

const UpdateProfile = () => {
  const {
    data: userData,
    isFetching: isLoadingInitialData,
    isError,
    error,
  } = useGetProfileQuery();
  const dispatch = useDispatch<AppDispatch>();
  const {
    uploadFile,
    isLoading: isUploadingFile,
    isError: isErrUploadingFile,
    error: errUploadingFile,
  } = useFileUpload();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [previewImg, setPreviewImg] = useState('');

  const profileSchema = useMemo(() => {
    return z.object({
      firstName: userNameSchema,
      lastName: userNameSchema,
      avatarUrl: logoUrlSchema,
    });
  }, []);

  type FormData = z.infer<typeof profileSchema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    if (userData?.user) {
      reset({
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        avatarUrl: userData.user.avatarUrl ?? undefined,
      });
      if (userData.user.avatarUrl) {
        setPreviewImg(userData.user.avatarUrl);
      }
    }
  }, [userData, reset]);

  if (!isLoadingInitialData && isError) {
    return (
      <ErrorPage
        status={(error as any)?.status}
        message={(error as any)?.data?.title}
      />
    );
  }

  if (isLoadingInitialData) {
    return (
      <div className='flex-center min-h-screen'>
        <CircularProgress />
      </div>
    );
  }

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const url = await uploadFile(selectedFile);
    setPreviewImg(url);
    reset({ ...userData, avatarUrl: url });
  };

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        avatarUrl: data.avatarUrl ?? null,
      }).unwrap();
      dispatch(
        updateUser({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          avatarUrl: data.avatarUrl ?? null,
        })
      );
      toast.success('Profile has been Updated Successfully.');
    } catch (err: any) {
      ErrToastHandler(err);
    }
  };

  return (
    <section className='sm:pt-28 pt-20 min-h-screen px-6 bg-[#F9FAFB] pb-10'>
      <div className='md:w-[60%] sm:[70%] mx-auto'>
        <h1 className='sm:text-2xl text-xl font-semibold text-gray-900'>
          Account Settings
        </h1>
        <p className='text-gray-500 mt-1 sm:text-base text-sm tracking-wide'>
          Manage your profile and security preferences.
        </p>
        <div className='bg-white p-6 rounded-xl shadow-md mt-8 h-fit'>
          <h2 className='sm:text-lg text-base tracking-wide'>Public Profile</h2>
          <p className='text-gray-500 sm:text-base text-sm pb-6 border-b mt-0.5'>
            This information will be visible to other participants in your group
            orders.
          </p>
          <div className='flex justify-between items-center mt-8'>
            <div className='flex gap-4 items-center '>
              {isUploadingFile && !isErrUploadingFile ? (
                <div
                  className='sm:w-16 sm:h-16 w-12 h-12 rounded-full 
             bg-gradient-to-r from-gray-50 via-gray-400 to-gray-950
             bg-[length:200%_100%] animate-pulse'
                />
              ) : previewImg ? (
                <img
                  src={previewImg}
                  className='sm:w-16 sm:h-16 w-12 h-12 rounded-full object-cover'
                />
              ) : (
                <div className='sm:w-12 sm:h-12 w-10 h-10 rounded-full flex-center font-bold text-xs text-white shadow-sm bg-gradient-to-br from-gray-600 to-gray-800'>
                  {getInitials(
                    userData?.user?.firstName + ' ' + userData?.user?.lastName
                  )}
                </div>
              )}
              <label
                htmlFor='avatar'
                className='cursor-pointer sm:text-[14px]
                text-[12px] px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100/50 tracking-wide'
              >
                Change Avatar
              </label>
              <input
                type='file'
                id='avatar'
                className='hidden'
                accept='.pdf, .jpg , .jpeg , .png'
                onChange={handleUploadFile}
              />
            </div>
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
                  setPreviewImg('');
                  reset({ ...userData, avatarUrl: undefined });
                }}
              >
                <MdDelete />
              </IconButton>
            </Tooltip>
          </div>
          {isErrUploadingFile && (
            <div className='text-red-600 text-sm mt-3'>
              {(errUploadingFile as any).data.title ||
                'File upload failed. Please Try again.'}
            </div>
          )}
          <form
            className='flex flex-col gap-3 mt-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-wrap mt-4.5 gap-4 text-gray-800'>
              <div className='grow'>
                <label
                  htmlFor='firstName'
                  className='sm:text-[14px] text-[13px]'
                >
                  First name
                </label>
                <input
                  type='text'
                  id='firstName'
                  {...register('firstName')}
                  className='inputStyles mt-1'
                />
                {errors.firstName && (
                  <span className='text-sm text-red-600'>
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className='grow'>
                <label
                  htmlFor='lastName'
                  className='sm:text-[14px] text-[13px]'
                >
                  Last name
                </label>
                <input
                  type='text'
                  id='lastName'
                  {...register('lastName')}
                  className='inputStyles mt-1'
                />
                {errors.lastName && (
                  <span className='text-sm text-red-600'>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className='flex justify-end'>
              <FormButtonActions
                isValid={isValid}
                isLoading={isUpdating}
                isUploadingFile={isUploadingFile}
                loadingLabel='Saving...'
                submitLabel='Save Profile'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
