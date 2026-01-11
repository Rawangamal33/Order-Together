import type { AppDispatch } from '@/app/store';
import { usePostLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';
import { useMemo, useState } from 'react';
import logo from '../../assets/image.png';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, passSchema } from '@/features/auth/schemas/auth.schema';

const Login = () => {
  const location = useLocation();
  const from = location?.state?.from?.pathname;
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const schema = useMemo(() => {
    return z.object({
      email: emailSchema,
      password: passSchema,
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

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await postLogin({
        email: formData.email.trim(),
        password: formData.password.trim(),
      }).unwrap();
      dispatch(setCredentials(response));
      toast.success('Logged in successfully.');
      reset();
      const userRoles = response.user.role || [];
      if (userRoles.includes('Admin')) {
        navigate(from || '/admin/restaurants', { replace: true });
      } else if (userRoles.includes('User')) {
        navigate(from || '/', { replace: true });
      }
    } catch (err: any) {
      if (!err?.data) {
        toast.error('No Server Response');
      } else if (err?.status === 401) {
        toast.error(`${err.data?.title}`);
      } else if (err?.status === 400) {
        toast.error(err.data?.title);
      } else {
        toast.error('Login Failed. Please try again.');
      }
    }
  };

  const togglePassVisibility = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <section className='bg-[#F9FAFB] min-h-screen md:pt-38 pt-34'>
      <div className='md:max-w-[500px] sm:w-[80%] w-[90%] border shadow-xs py-10 rounded-lg bg-white sm:px-14 px-7 mx-auto'>
        <div className='flex-center gap-1.5 text-red-600'>
          <div className='md:text-3xl text-2xl'>
            <img src={logo} className='w-8 h-8 object-cover' alt='logo' />
          </div>
          <p className='md:text-xl text-lg tracking-wider font-bold'>
            OrderTogether
          </p>
        </div>
        <p className='text-gray-500 sm:text-[15px] text-[13px] text-center mt-1.5'>
          Sign in to manage your group orders
        </p>

        <form
          className='mt-9 flex flex-col gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor='email' className='labelStyles'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            required
            autoFocus
            autoComplete='email'
            placeholder='Enter your email'
            className='inputStyles'
          />
          {errors?.email && (
            <span className='text-secondRedColor'>{errors.email.message}</span>
          )}
          <label htmlFor='password' className='labelStyles mt-3'>
            Password:
          </label>
          <div className='flex items-center'>
            <input
              type={`${showPass ? 'text' : 'password'}`}
              id='password'
              {...register('password')}
              required
              autoComplete='current-password'
              placeholder='Enter your password'
              className='inputStyles'
            />
            <button
              type='button'
              onClick={togglePassVisibility}
              className='-ml-8 cursor-pointer text-gray-600'
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <IoMdEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <span className='text-secondRedColor'>
              {errors.password.message}
            </span>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className={`submitBtn w-full mt-5  ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className='mt-6 pb-3'>
          <p className='text-gray-400 md:text-base text-[15px]'>
            Don't have an account?
          </p>
          <NavLink
            to='/register'
            className='text-red-600 md:text-base text-[15px] underline cursor-pointer'
          >
            Create an Account
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Login;
