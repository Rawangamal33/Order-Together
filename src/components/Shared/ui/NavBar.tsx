import { Button } from './button';
import logo from '../../../assets/image.png';
import { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useAuthPortals } from '@/hooks/useAuthPortals';

const NavBar = () => {
  const { onOpenLogin, onOpenRegister } = useAuthPortals();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

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

        <div className='flex-1 hidden lg:flex justify-end gap-3'>
          <Button
            variant='outline'
            className='text-white font-semibold border-[#D83427] bg-red-600'
            onClick={() => onOpenLogin()}
          >
            Login{' '}
          </Button>
          <Button
            variant='outline'
            className='bg-white text-gray-600 font-semibold'
            onClick={() => onOpenRegister()}
          >
            Sign Up
          </Button>
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
              className='text-3xl cursor-pointer text-gray-600 hover:text-gray-800'
              aria-label='Close menu'
            >
              <IoClose />
            </button>
          </div>

          <div className='flex flex-col gap-4 p-5'>
            <Button
              variant='outline'
              className='w-full text-white font-semibold border-[#D83427] bg-red-600'
              onClick={() => {
                onOpenLogin();
                closeSidebar();
              }}
            >
              Login
            </Button>
            <Button
              variant='outline'
              className='w-full bg-white text-gray-600 font-semibold'
              onClick={() => {
                onOpenRegister();
                closeSidebar();
              }}
            >
              Sign Up
            </Button>

            {/* Add*/}
            <div className='mt-4 pt-4 border-t'>{/*  */}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
