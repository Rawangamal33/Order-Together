import { CgClose } from 'react-icons/cg';
import { BsFillImageFill } from 'react-icons/bs';
import { Button } from '../ui/button';

const CreateRestaurant = () => {
  return (
    <section className='flex-center'>
      <div className='fixed inset-0 bg-black/50 z-100'></div>
      <div
        className='fixed top-1/4 z-100 bg-white md:w-[500px] sm:w-[65%] w-[80%] h-fit pb-5 rounded-xl py-3.5 px-5'
        role='dialog'
        aria-modal='true'
      >
        {/*  */}
        <div className='flex items-center justify-between mt-2 border-b pb-3'>
          <h1 className='font-semibold font-sans text-gray-950 text-[20px]'>
            Create New Restaurant
          </h1>
          <div
            className='cursor-pointer w-fit md:text-xl text-[18px] text-gray-500'
            aria-label='Close Create Restaurant'
          >
            <CgClose />
          </div>
        </div>
        {/*  */}
        <form className='mt-6 flex flex-col gap-2'>
          <label
            htmlFor='name'
            className='labelStyles text-[14px] text-gray-700'
          >
            Restaurant Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            autoFocus
            placeholder="e.g. Papa John's"
            className='inputStyles text-[13px] text-gray-700'
          />
          <label className='text-[14px] text-gray-700 mt-2'>Logo</label>
          <label
            htmlFor='upload image'
            className='w-full mx-auto h-32 border-2 border-dashed rounded-md border-gray-300 bg-[#F9FAFB] flex flex-col items-center justify-center gap-2'
          >
            <div className='text-[23px] text-[#9CA3AF]'>
              <BsFillImageFill />
            </div>
            <p className='text-xs text-[#6B7280]'>
              Click to upload (.jpg, .png, and .webp).
            </p>
          </label>
          <input type='file' id='upload image' className='hidden' />

          <div className='flex items-center gap-1.5 mt-1.5'>
            <input type='checkbox' id='visible' className='accent-blue-600' />
            <label htmlFor='visible' className='text-[14px] text-gray-700'>
              Visible to Users
            </label>
          </div>

          <div className='flex justify-between items-center mt-4'>
            <Button variant='outline' className='border-gray-300'>
              Cancel
            </Button>
            <Button type='submit' size={'sm'} variant='destructive'>
              Create Restaurant
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateRestaurant;
