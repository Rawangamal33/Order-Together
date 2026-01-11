import { useLogoutMutation } from '@/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logoutRedux } from '@/features/auth/authSlice';
import { persistor, type AppDispatch } from '@/app/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api/api';
import useAuth from './useAuth';

const useLogout = () => {
  const [logoutMutationout, { isLoading }] = useLogoutMutation();
  const { refreshToken } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutMutationout({ token: refreshToken }).unwrap();
      dispatch(logoutRedux());
      dispatch(api.util.resetApiState());

      await persistor.purge();
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
