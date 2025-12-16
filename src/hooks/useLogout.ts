import { useLogoutMutation } from '@/features/auth/authApi';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { logoutRedux } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/app/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [logoutMutationout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { refreshToken, user } = useAuth();
  const userId = user?.id;
  const logout = async () => {
    try {
      if (userId && refreshToken) {
        await logoutMutationout({ userId, token: refreshToken }).unwrap();
      }
      dispatch(logoutRedux());
      toast.success("Logged out successfully'.");
      navigate('/', {
        replace: true,
        state: {
          openLogin: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { logout, isLoading };
};

export default useLogout;
