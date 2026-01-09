import { Outlet } from 'react-router-dom';
import NavBar from '../ui/NavBar';

const MainLayout = () => {
  return (
    <div className='relative min-h-screen'>
      <div className='fixed top-0 z-50 w-full'>
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
