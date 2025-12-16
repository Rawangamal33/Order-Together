import AnimationRouting from '@/animation/AnimationRouting';
import MainLayout from '@/components/Shared/layouts/MainLayout';
import AdminPage from '@/pages/Admin/AdminPage';
import Home from '@/pages/Home';
import Unauthorized from '@/pages/Unauthorized';
import UpdateProfile from '@/pages/UpdateProfile';
import UserPage from '@/pages/User/UserPage';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  const location = useLocation();
  const ROLES = {
    USER: 'User',
    ADMIN: 'Admin',
  };
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainLayout />}>
          {/* Public Routes */}
          <Route
            index
            element={
              <AnimationRouting>
                <Home />
              </AnimationRouting>
            }
          />
          <Route
            path='unauthorized'
            element={
              <AnimationRouting>
                <Unauthorized />
              </AnimationRouting>
            }
          />
          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoutes allowedRoles={[ROLES.ADMIN, ROLES.USER]} />
            }
          >
            <Route
              path='profile'
              element={
                <AnimationRouting>
                  <UpdateProfile />
                </AnimationRouting>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
            <Route
              path='admin'
              element={
                <AnimationRouting>
                  <AdminPage />
                </AnimationRouting>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoutes allowedRoles={[ROLES.ADMIN, ROLES.USER]} />
            }
          >
            <Route
              path='user'
              element={
                <AnimationRouting>
                  <UserPage />
                </AnimationRouting>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
