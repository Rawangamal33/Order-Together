import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );
  const user = useSelector((state: RootState) => state.auth.user);
  return { accessToken, refreshToken, user };
};

export default useAuth;
