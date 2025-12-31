import { useLogoutMutation } from '@/features/auth/authApi';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { logoutRedux } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/app/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api/api';

const useLogout = () => {
  const [logoutMutationout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { refreshToken } = useAuth();

  const logout = async () => {
    try {
      if (refreshToken) {
        await logoutMutationout({ token: refreshToken }).unwrap();
      }
      dispatch(logoutRedux());
      dispatch(api.util.resetApiState());
      toast.success('Logged out successfully.');
      navigate('/login', {
        replace: true,
      });
    } catch (err) {
      toast.error('Logout failed. Please try again.');
    }
  };
  return { logout, isLoading };
};

export default useLogout;
