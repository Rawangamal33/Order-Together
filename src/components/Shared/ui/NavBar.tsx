import { Button } from './button';
import logo from '../../../assets/image.png';
import { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useAuthPortals } from '@/hooks/useAuthPortals';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { MdLogin } from 'react-icons/md';
import { SiDoordash } from 'react-icons/si';
import { FaUserPlus } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const NavBar = () => {
  const { onOpenLogin, onOpenRegister } = useAuthPortals();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const { accessToken, user } = useAuth();
  const roles = user?.role;
  const { logout, isLoading } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSideBarVisibility = () => {
    setShowSideBar((prev) => !prev);
  };

  const closeSidebar = () => {
    setShowSideBar(false);
  };

  return (
    <>
      <nav
        className={`flex justify-between items-center py-1 px-5 transition-all duration-500 ${
          isScrolled
            ? 'bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'
            : 'bg-[#f9372a]'
        }`}
      >
        <div className='flex-1 hidden lg:block'></div>

        <h1 className='flex-center gap-1.5'>
          <div>
            <img src={logo} className='sm:w-10 w-7' alt='logo' />
          </div>
          <span
            className={`tracking-wider font-bold ${
              isScrolled
                ? 'text-red-600 sm:text-2xl text-xl'
                : 'text-white sm:text-4xl text-xl'
            }`}
          >
            <NavLink to='/'>OrderTogether</NavLink>
          </span>
        </h1>

        <div className='flex-1 flex justify-end lg:hidden'>
          <button
            className={`cursor-pointer transition-colors duration-500 ${
              isScrolled
                ? 'sm:text-4xl text-3xl'
                : 'text-white sm:text-5xl text-4xl'
            }`}
            onClick={toggleSideBarVisibility}
            aria-label='Toggle menu'
          >
            <BiMenuAltRight />
          </button>
        </div>

        <div className='flex-1 hidden lg:flex items-center justify-end gap-3'>
          {!accessToken && (
            <>
              <Button
                variant='outline'
                className='text-white font-semibold border-[#D83427] bg-red-600'
                onClick={() => onOpenLogin()}
              >
                Login
              </Button>
              <Button
                variant='outline'
                className='bg-white text-gray-600 font-semibold'
                onClick={() => onOpenRegister()}
              >
                Sign Up
              </Button>
            </>
          )}
          {accessToken && (
            <>
              <NavLink
                to='/profile'
                className={`text-[22px] mr-3 cursor-pointer
                ${isScrolled ? 'text-orangeColor' : 'text-amber-50'}`}
              >
                <FaUserCircle />
              </NavLink>

              <NavLink
                to={roles?.includes('Admin') ? '/admin/restaurants' : '/user'}
                className={({ isActive }) => `mr-3 hover:underline ${
                  isActive ? 'underline' : ''
                }
                ${isScrolled ? 'text-black' : 'text-white '}`}
              >
                Dashboard
              </NavLink>

              <Button
                variant='outline'
                disabled={isLoading}
                className={` bg-white text-gray-600 shadow-md font-semibold ${
                  isLoading ? 'cursor-not-allowed opacity-75' : ''
                }`}
                onClick={logout}
              >
                {isLoading ? 'Logging out..' : ' Log out'}
              </Button>
            </>
          )}
        </div>
      </nav>

      {showSideBar && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-500 lg:hidden ${
          showSideBar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center p-5 border-b'>
            <span className='text-xl font-bold text-gray-800'>Menu</span>
            <button
              onClick={closeSidebar}
              className='text-2xl cursor-pointer text-gray-600 hover:text-gray-800'
              aria-label='Close menu'
            >
              <IoClose />
            </button>
          </div>

          <div className='flex flex-col pb-3 pt-2 px-1.5'>
            {!accessToken && (
              <>
                <div
                  className='border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer'
                  onClick={() => {
                    onOpenLogin();
                    closeSidebar();
                  }}
                >
                  <div className='text-lg ml-4 text-red-600'>
                    <SiDoordash />
                  </div>
                  <Button
                    variant='ghost'
                    className='w-full py-6 hover:bg-none font-semibold text-gray-700 border-none text-left text-base justify-start'
                  >
                    Login
                  </Button>
                </div>
                <div
                  className='border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer'
                  onClick={() => {
                    onOpenRegister();
                    closeSidebar();
                  }}
                >
                  <div className='text-lg ml-4'>
                    <FaUserPlus />
                  </div>
                  <Button
                    variant='ghost'
                    className='w-full py-6 hover:bg-none font-semibold text-gray-700 border-none text-left text-base justify-start'
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
            {accessToken && (
              <>
                <NavLink
                  to={roles?.includes('Admin') ? '/admin/restaurants' : '/user'}
                  className={({ isActive }) =>
                    `border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer ${
                      isActive ? 'underline' : ''
                    }`
                  }
                >
                  <div className='text-lg ml-4 text-secondRedColor'>
                    <MdDashboard />
                  </div>
                  <Button
                    variant='ghost'
                    className='w-full py-6 hover:bg-none font-semibold text-gray-700 border-none text-left text-base justify-start'
                  >
                    Dashboard
                  </Button>
                </NavLink>

                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer ${
                      isActive ? 'underline' : ''
                    }`
                  }
                >
                  <div className='text-lg ml-4 text-secondRedColor'>
                    <FaUserCircle />
                  </div>
                  <Button
                    variant='ghost'
                    className='w-full py-6 hover:bg-none font-semibold text-gray-700 border-none text-left text-base justify-start'
                  >
                    Profile Settings
                  </Button>
                </NavLink>

                <div
                  className='border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer'
                  onClick={logout}
                >
                  <div className='text-lg ml-4'>
                    <MdLogin />
                  </div>
                  <Button
                    variant='ghost'
                    disabled={isLoading}
                    className={`w-full py-6 hover:bg-none font-semibold text-gray-700 border-none text-left text-base justify-start ${
                      isLoading ? 'cursor-not-allowed opacity-75' : ''
                    }`}
                  >
                    {isLoading ? 'Logging out..' : ' Log out'}
                  </Button>
                </div>
              </>
            )}

            {/* Add*/}
            <div>{/* */}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
