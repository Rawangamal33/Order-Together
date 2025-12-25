import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const { user, accessToken } = useAuth();
  const roles = user?.role;

  if (roles?.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  } else if (accessToken) {
    return <Navigate to='/unauthorized' replace />;
  } else {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
