import AnimationRouting from '@/animation/AnimationRouting';
import MainLayout from '@/components/layouts/MainLayout';
import Home from '@/pages/Home';
import Unauthorized from '@/pages/Unauthorized';
import UpdateProfile from '@/pages/UpdateProfile';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

const AppRoutes = () => {
  const location = useLocation();
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
            path='/unauthorized'
            element={
              <AnimationRouting>
                <Unauthorized />
              </AnimationRouting>
            }
          />
          <Route
            path='/profile'
            element={
              <AnimationRouting>
                <UpdateProfile />
              </AnimationRouting>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
