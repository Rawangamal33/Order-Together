import { Outlet } from 'react-router-dom';
import NavBar from '../ui/NavBar';
import LoginPortal from '../portals/LoginPortal';
import RegisterPortal from '../portals/RegisterPortal';
import ForgotPassword from '../portals/ForgotPassword';
import { useAuthPortals } from '@/hooks/useAuthPortals';

const MainLayout = () => {
  const { activePortal } = useAuthPortals();

  return (
    <div className='relative min-h-screen'>
      <div className='fixed top-0 z-50 w-full'>
        <NavBar />
      </div>
      <Outlet />

      {activePortal === 'login' && <LoginPortal />}
      {activePortal === 'register' && <RegisterPortal />}
      {activePortal === 'forgotPass' && <ForgotPassword />}
    </div>
  );
};

export default MainLayout;
