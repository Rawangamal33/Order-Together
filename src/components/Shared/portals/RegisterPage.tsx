import { CgClose } from 'react-icons/cg';
import { useMemo, useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SiDoordash } from 'react-icons/si';
import { usePostRegisterMutation } from '@/features/auth/authApi';
import { toast } from 'react-toastify';
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { usePortals } from '@/hooks/usePortals';
import GlobalPortal from './GlobalPortal';

const RegisterPage = () => {
  const [postRegister, { isLoading }] = usePostRegisterMutation();
  const { onOpenLogin, onClose } = usePortals();
  const [showPass, setShowPass] = useState(false);

  const nameSchema = z
    .string()
    .refine((val) => /^[A-Za-z\u0600-\u06FF]{2}/.test(val), {
      message: 'Name must start with at least two letters.',
    })
    .refine((val) => !/^[_*!$]/.test(val), {
      message: 'Name cannot start with a special character (_ * ! $).',
    })
    .refine((val) => /^[A-Za-z\u0600-\u06FF\s]+$/.test(val), {
      message: 'Special characters are not allowed.',
    })
    .refine((val) => !/\s(?![A-Za-z\u0600-\u06FF])/.test(val), {
      message: 'Every space must be followed by a letter.',
    })
    .refine((val) => (!val.includes(' ') ? val.length >= 3 : true), {
      message: 'Name must be at least 3 letters if there are no spaces.',
    });

  const schema = useMemo(() => {
    return z.object({
      email: z.string().email({ message: 'Invalid email address.' }),
      firstName: nameSchema,
      lastName: nameSchema,
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .regex(/(?=.*[a-z])/, {
          message: 'Password must contain a lowercase letter.',
        })
        .regex(/(?=.*[A-Z])/, {
          message: 'Password must contain an uppercase letter.',
        })
        .regex(/(?=.*\d)/, { message: 'Password must contain a number.' }),
    });
  }, []);

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await postRegister({
        email: data.email.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        password: data.password.trim(),
      }).unwrap();
      toast.success('You Registered Successfully.');
      reset();
      onOpenLogin();
    } catch (err: any) {
      if (!err?.data) {
        toast.error('No Server Response.');
      } else if (err?.status === 409) {
        toast.error(`${err.data?.title}`);
      } else if (err?.status === 400) {
        toast.error(err.data?.title);
      } else {
        toast.error('Registration Failed. Please try again.');
      }
    }
  };
  const togglePassVisibility = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <GlobalPortal
      headerSec={
        <>
          <div
            onClick={() => onClose()}
            className='cursor-pointer w-fit md:text-xl text-[18px]'
            aria-label='close register'
          >
            <CgClose />
          </div>
          <div className='flex-center gap-2 text-red-600'>
            <div className='md:text-3xl text-2xl'>
              <SiDoordash />
            </div>
            <p className='md:text-xl text-lg tracking-wider font-bold'>
              OrderTogether
            </p>
          </div>
        </>
      }
    >
      <form
        className='mt-9 flex flex-col gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor='email' className='labelStyles'>
          Email:
        </label>
        <input
          type='text'
          id='email'
          {...register('email')}
          required
          autoFocus
          autoComplete='email'
          placeholder='Enter your email'
          className='inputStyles'
        />
        {errors.email && (
          <span className='text-secondRedColor'>{errors.email.message}</span>
        )}
        <label htmlFor='firstName' className='labelStyles mt-3'>
          First Name:
        </label>
        <input
          type='text'
          id='firstName'
          {...register('firstName')}
          required
          autoComplete='given-name'
          placeholder='Enter your first name'
          className='inputStyles'
        />
        {errors.firstName && (
          <span className='text-secondRedColor'>
            {errors.firstName.message}
          </span>
        )}

        <label htmlFor='lastName' className='labelStyles mt-3 '>
          Last Name:
        </label>
        <input
          type='text'
          id='lastName'
          {...register('lastName')}
          required
          autoComplete='family-name'
          placeholder='Enter your second name'
          className='inputStyles'
        />
        {errors.lastName && (
          <span className='text-secondRedColor'>{errors.lastName.message}</span>
        )}

        <label htmlFor='password' className='labelStyles mt-3 '>
          Password:
        </label>
        <div className='flex items-center'>
          <input
            type={`${showPass ? 'text' : 'password'}`}
            id='password'
            {...register('password')}
            required
            autoComplete='new-password'
            placeholder='Enter your password'
            className='inputStyles'
          />
          {showPass ? (
            <div
              className='-ml-8 cursor-pointer text-gray-600'
              onClick={togglePassVisibility}
            >
              <IoMdEye />
            </div>
          ) : (
            <div
              className='-ml-8 cursor-pointer text-gray-600'
              onClick={togglePassVisibility}
            >
              <FaEyeSlash />
            </div>
          )}
        </div>
        {errors.password && (
          <span className='text-secondRedColor'>{errors.password.message}</span>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className={`submitBtn sm:w-full w-[70%] ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <div className='mt-9 pb-4'>
        <p className='text-gray-400 md:text-base text-[15px]'>
          Have already an account?
        </p>
        <button
          onClick={() => onOpenLogin()}
          className='text-secondRedColor md:text-base text-[15px] cursor-pointer underline'
        >
          Log In Here
        </button>
      </div>
    </GlobalPortal>
  );
};

export default RegisterPage;
