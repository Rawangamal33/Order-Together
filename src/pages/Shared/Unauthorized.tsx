import unAuthorizedImg from '../../assets/401 Error Unauthorized-pana (1).svg';

const Unauthorized = () => {
  return (
    <div className='pt-20 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-[#f92a2a] md:text-4xl sm:text-3xl text-2xl font-semibold'>
        401 Unauthorized
      </h1>
      <p className='text-[#f9372a] sm:text-base text-[14px]'>
        Admins Only are allowed to access this page.{' '}
      </p>
      <img src={unAuthorizedImg} className='md:w-96 sm:w-64 w-56' />
    </div>
  );
};

export default Unauthorized;
