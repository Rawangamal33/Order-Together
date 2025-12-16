import { useAuthPortals } from '@/hooks/useAuthPortals';
import ReactDom from 'react-dom';
import { CgClose } from 'react-icons/cg';
import { SiDoordash } from 'react-icons/si';

const ForgotPassword = () => {
  const { onClose } = useAuthPortals();

  const forgotPassPortal = document.getElementById('forgotPassPortal');
  if (!forgotPassPortal) return null;
  return ReactDom.createPortal(
    <section className='flex-center'>
      <div
        className='fixed inset-0 bg-black/50 z-100'
        onClick={() => onClose()}
      ></div>
      <div
        className='fixed top-1/7 z-100 bg-white md:w-[450px] sm:w-[50%] w-[80%] h-[370px] rounded-md py-3.5 px-5'
        role='dialog'
        aria-modal='true'
      >
        <div
          onClick={() => onClose()}
          className='cursor-pointer w-fit md:text-xl text-[18px]'
          aria-label='close forgot password'
        >
          <CgClose />
        </div>
        <div className='flex-center gap-2 text-red-600'>
          <div className='md:text-3xl text-2xl'>
            <SiDoordash />
          </div>
          <p className='md:text-xl text-lg tracking-wider font-bold'>
            OrderTogether
          </p>
        </div>
        <form className='mt-9 flex flex-col gap-2'>
          <label htmlFor='currentPass' className='labelStyles mt-3'>
            Current Password:
          </label>
          <input
            type='password'
            id='currentPass'
            required
            autoComplete='current-password'
            className='inputStyles'
          />
          <label htmlFor='newPass' className='labelStyles mt-3'>
            New Password:
          </label>
          <input
            type='password'
            id='newPass'
            required
            autoComplete='current-password'
            className='inputStyles'
          />

          <button type='submit' className='submitBtn sm:w-full w-[50%] mt-5'>
            Submit
          </button>
        </form>
      </div>
    </section>,
    forgotPassPortal
  );
};

export default ForgotPassword;
