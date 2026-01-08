import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);
  return { accessToken, user };
};

export default useAuth;
