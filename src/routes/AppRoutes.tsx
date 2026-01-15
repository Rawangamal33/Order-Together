import AnimationRouting from '@/animation/AnimationRouting';
import Home from '@/pages/Shared/Home';
import Unauthorized from '@/pages/Shared/Unauthorized';
import UpdateProfile from '@/pages/Shared/UpdateProfile';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from '@/pages/Shared/NotFound';
import Dashboard from '@/pages/Admin/Dashboard';
import Login from '@/pages/Shared/Login';
import Register from '@/pages/Shared/Register';
import MenuPage from '@/pages/Admin/MenuPage';
import MainLayout from '@/components/layouts/MainLayout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '@/components/ErrorHandlers/ErrorBoundaryFallback';

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
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <AnimationRouting>
                    <UpdateProfile />
                  </AnimationRouting>
                </ErrorBoundary>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
            <Route
              path='admin/restaurants'
              element={
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <AnimationRouting>
                    <Dashboard />
                  </AnimationRouting>
                </ErrorBoundary>
              }
            />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
            <Route
              path={`admin/restaurants/:id/menu-items`}
              element={
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <AnimationRouting>
                    <MenuPage />
                  </AnimationRouting>
                </ErrorBoundary>
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
