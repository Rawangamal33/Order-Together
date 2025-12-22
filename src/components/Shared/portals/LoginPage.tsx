import type { AppDispatch } from '@/app/store';
import { usePostLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';
import type { LoginRequest } from '@/types/auth.types';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { SiDoordash } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { usePortals } from '@/hooks/usePortals';

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const location = useLocation();
  const from = location?.state?.from?.pathname;
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { onOpenRegister, onOpenForgotPass, onClose } = usePortals();

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email || !formData.password) return;
    try {
      const response = await postLogin({
        email: formData.email.trim(),
        password: formData.password.trim(),
      }).unwrap();
      dispatch(setCredentials(response));
      toast.success('Logged in successfully.');
      setFormData({
        email: '',
        password: '',
      });
      onClose();
      const userRoles = response.user.role || [];
      if (userRoles.includes('Admin')) {
        navigate(from || '/admin/restaurants', { replace: true });
      } else if (userRoles.includes('User')) {
        navigate(from || '/user', { replace: true });
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
    <section className='flex-center'>
      <div
        className='fixed inset-0 bg-black/50 z-100'
        onClick={() => onClose()}
      ></div>
      <div
        className='fixed top-1/7 z-100 bg-white md:w-[450px] sm:w-[50%] w-[80%] h-fit rounded-md py-3.5 px-5'
        role='dialog'
        aria-modal='true'
      >
        <div
          onClick={() => onClose()}
          className='cursor-pointer w-fit md:text-xl text-[18px]'
          aria-label='close login'
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
        <form className='mt-9 flex flex-col gap-2' onSubmit={handleSubmit}>
          <label htmlFor='email' className='labelStyles'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
            autoComplete='username'
            placeholder='Enter your email'
            className='inputStyles'
          />
          <label htmlFor='password' className='labelStyles mt-3'>
            Password:
          </label>
          <div className='flex items-center'>
            <input
              type={`${showPass ? 'text' : 'password'}`}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete='current-password'
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
          <div className='flex justify-between items-cente sm:text-sm text-[12px] text-gray-500 mt-1'>
            <div className='flex gap-1'>
              <input type='checkbox' id='persist' className='accent-blue-600' />
              <label htmlFor='persist'>Remember me</label>
            </div>
            <p
              className='cursor-pointer underline'
              onClick={() => onOpenForgotPass()}
            >
              Forgot Password?
            </p>
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className={`submitBtn sm:w-full w-[50%] mt-5  ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className='mt-9 pb-4'>
          <p className='text-gray-400 md:text-base text-[15px]'>
            Don't have an account?
          </p>
          <button
            onClick={() => onOpenRegister()}
            className='text-red-600 md:text-base text-[15px] underline cursor-pointer'
          >
            Create an Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
