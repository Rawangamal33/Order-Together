import logo from '../../assets/image.png';
const Footer = () => {
  return (
    <div className='bg-gray-900 h-[110px] flex flex-col items-center justify-center gap-4'>
      <h1 className='flex-center gap-1.5'>
        <div>
          <img src={logo} className='md:w-10 w-7' />
        </div>
        <span className='tracking-wider font-bold text-white md:text-3xl sm:text-2xl text-xl'>
          OrderTogether
        </span>
      </h1>
      <p className='text-gray-400 md:text-base text-sm'>
        © 2025 OrderTogether. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
