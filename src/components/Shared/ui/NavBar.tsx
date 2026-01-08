import { Button } from './button';
import logo from '../../../assets/image.png';
import { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { MdLogin } from 'react-icons/md';
import { SiDoordash } from 'react-icons/si';
import { FaUserPlus } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useGetProfileQuery } from '@/features/profile/profileApi';
import { getInitials } from '@/utils/ImgPlaceholder';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const { accessToken, user } = useAuth();

  const { logout, isLoading } = useLogout();
  const { data } = useGetProfileQuery(undefined, { skip: !accessToken });
  const dispayedUser = data?.user ?? user;
  const roles = dispayedUser?.role;
  const userImg = dispayedUser?.avatarUrl;

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
          <img src={logo} className='sm:w-10 w-7' alt='logo' />
          <NavLink
            to='/'
            className={`tracking-wider font-bold ${
              isScrolled
                ? 'text-red-600 sm:text-2xl text-xl'
                : 'text-white sm:text-4xl text-xl'
            }`}
          >
            OrderTogether
          </NavLink>
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
              <NavLink
                to='/login'
                className='py-1.5 px-4 shadow-sm rounded-md text-white text-[14px] font-semibold border-[#D83427] bg-red-600'
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                className='bg-white text-gray-600 py-1.5 px-4 shadow-sm rounded-md text-[14px] font-semibold'
              >
                Sign Up
              </NavLink>
            </>
          )}

          {accessToken && (
            <>
              <NavLink
                to='/profile'
                className='text-[22px] mr-3 cursor-pointer'
              >
                {userImg ? (
                  <img
                    src={userImg}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full flex-center font-bold text-xs text-white shadow-sm bg-gradient-to-br from-gray-600 to-gray-800'>
                    {getInitials(
                      dispayedUser.firstName + ' ' + dispayedUser.lastName
                    )}
                  </div>
                )}
              </NavLink>
              {accessToken && roles?.includes('Admin') && (
                <NavLink
                  to={'/admin/restaurants'}
                  className={({ isActive }) => `mr-3 hover:underline ${
                    isActive ? 'underline' : ''
                  }
                ${isScrolled ? 'text-black' : 'text-white '}`}
                >
                  Dashboard
                </NavLink>
              )}

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
                <NavLink
                  to='/login'
                  className='border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer'
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
                </NavLink>
                <NavLink
                  to='/register'
                  className='border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer'
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
                </NavLink>
              </>
            )}

            {accessToken && roles?.includes('Admin') && (
              <NavLink
                to={'/admin/restaurants'}
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
            )}

            {accessToken && (
              <>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `border-b flex items-center text-left justify-start hover:bg-[#F6F6F6] cursor-pointer ${
                      isActive ? 'underline' : ''
                    }`
                  }
                >
                  {userImg ? (
                    <img
                      src={userImg}
                      className='w-7 h-7 ml-3 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-7 h-7 ml-3 rounded-full flex-center font-bold text-[10px] px-3 text-white shadow-sm bg-gradient-to-br from-gray-600 to-gray-800'>
                      {getInitials(
                        dispayedUser.firstName + ' ' + dispayedUser.lastName
                      )}
                    </div>
                  )}
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
