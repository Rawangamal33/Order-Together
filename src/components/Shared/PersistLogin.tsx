import type { AppDispatch } from '@/app/store';
import { useRefreshMutation } from '@/features/auth/authApi';
import { logoutRedux, setCredentials } from '@/features/auth/authSlice';
import useAuth from '@/hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PersistLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [refresh] = useRefreshMutation();
  const { refreshToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const result = await refresh({ token: null }).unwrap();

        if (isMounted) {
          dispatch(
            setCredentials({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              user: result.user,
            })
          );
        }
      } catch (err: any) {
        console.error('Refresh failed:', err);
        if (isMounted) {
          if (err?.status !== 'FETCH_ERROR') {
            toast.error('Session expired. Please login again.');
          }
          dispatch(logoutRedux());
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (refreshToken !== null) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='min-h-screen flex-center'>
          <CircularProgress size={40} color='primary' />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
