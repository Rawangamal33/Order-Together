import { Outlet } from 'react-router-dom';
import NavBar from '../ui/NavBar';
import ForgotPassword from '../portals/ForgotPassword';
import { usePortals } from '@/hooks/usePortals';
import LoginPage from '../portals/LoginPage';
import RegisterPage from '../portals/RegisterPage';
import CreateRestaurant from '../portals/CreateRestaurant';

const MainLayout = () => {
  const { activePortal } = usePortals();

  return (
    <div className='relative min-h-screen'>
      <div className='fixed top-0 z-50 w-full'>
        <NavBar />
      </div>
      <Outlet />
      {activePortal === 'login' && <LoginPage />}
      {activePortal === 'register' && <RegisterPage />}
      {activePortal === 'forgotPass' && <ForgotPassword />}
      {activePortal === 'createRestaurant' && <CreateRestaurant />}
    </div>
  );
};

export default MainLayout;
