import AnimationRouting from '@/animation/AnimationRouting';
import MainLayout from '@/components/Shared/layouts/MainLayout';
import Home from '@/pages/Home';
import Unauthorized from '@/pages/Unauthorized';
import UpdateProfile from '@/pages/UpdateProfile';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Admin/Dashboard';
import UserDashboard from '@/pages/User/UserDashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

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
          <Route
            index
            element={
              <AnimationRouting>
                <Home />
              </AnimationRouting>
            }
          />
          <Route
            path='/login'
            element={
              <AnimationRouting>
                <Login />
              </AnimationRouting>
            }
          />
          <Route
            path='/register'
            element={
              <AnimationRouting>
                <Register />
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
              path='admin/restaurants'
              element={
                <AnimationRouting>
                  <Dashboard />
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
                  <UserDashboard />
                </AnimationRouting>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
