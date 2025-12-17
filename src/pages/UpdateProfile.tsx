import { Button } from '@/components/Shared/ui/button';
import { useState } from 'react';

const UpdateProfile = () => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <section className='sm:pt-28 pt-20 min-h-screen px-6 bg-[#F9FAFB] pb-10'>
      <div className='md:w-[60%] sm:[70%] mx-auto'>
        <h1 className='sm:text-2xl text-xl font-semibold text-gray-900'>
          Account Settings
        </h1>
        <p className='text-gray-500 mt-1 sm:text-base text-sm tracking-wide'>
          Manage your profile and security preferences.
        </p>
        <div className='bg-white p-6 rounded-xl shadow-md mt-8 h-fit'>
          <h2 className='sm:text-lg text-base tracking-wide'>Public Profile</h2>
          <p className='text-gray-500 sm:text-base text-sm pb-6 border-b mt-0.5'>
            This information will be visible to other participants in your group
            orders.
          </p>
          <form className='flex flex-col gap-3 mt-8'>
            <div className='flex gap-5 items-center'>
              {preview && (
                <img
                  src={preview}
                  className='sm:w-16 sm:h-16 w-12 h-12 rounded-full object-cover'
                />
              )}
              <label
                htmlFor='avatar'
                className='cursor-pointer sm:text-[14px]
                text-[12px] px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100/50 tracking-wide'
              >
                Change Avatar
              </label>
              <input
                type='file'
                id='avatar'
                className='hidden'
                accept='.pdf, .jpg , .jpeg , .png'
                onChange={handleFileChange}
              />
            </div>
            <div className='flex flex-wrap mt-4.5 gap-4 text-gray-800'>
              <div className='grow'>
                <label
                  htmlFor='firstName'
                  className='sm:text-[14px] text-[13px]'
                >
                  First name
                </label>
                <input
                  type='text'
                  id='firstName'
                  className='inputStyles mt-1'
                />
              </div>
              <div className='grow'>
                <label
                  htmlFor='lastName'
                  className='sm:text-[14px] text-[13px]'
                >
                  Last name
                </label>
                <input type='text' id='lastName' className='inputStyles mt-1' />
              </div>
            </div>
            <div className='mt-6 text-end'>
              <Button
                type='submit'
                className='bg-orangeColor sm:text-[14px] text-[12px]'
              >
                Save Profile
              </Button>
            </div>
          </form>
        </div>
        {/*  */}
        <div className='bg-white p-6 rounded-xl shadow-md mt-8 h-fit'>
          <h2 className='sm:text-lg text-base tracking-wide'>Security</h2>
          <p className='text-gray-500 sm:text-base text-sm pb-6 border-b mt-0.5'>
            Update your password to keep your account safe.
          </p>
          <form className='flex flex-col gap-3 mt-8'>
            <div className='flex flex-wrap mt-4.5 gap-4 text-gray-800'>
              <div className='grow'>
                <label
                  htmlFor='currentPass'
                  className='sm:text-[14px] text-[13px]'
                >
                  Current Password
                </label>
                <input
                  type='password'
                  id='currentPass'
                  className='inputStyles mt-1'
                />
              </div>
              <div className='grow'>
                <label htmlFor='newPass' className='sm:text-[14px] text-[13px]'>
                  New Password
                </label>
                <input
                  type='password'
                  id='newPass'
                  className='inputStyles mt-1'
                />
              </div>
              <div className='w-full mt-3'>
                <label
                  htmlFor='confirmNewPass'
                  className='whitespace-nowrap sm:text-[14px] text-[13px]'
                >
                  Confirm New Password
                </label>
                <input
                  type='password'
                  id='confirmNewPass'
                  className='inputStyles mt-1'
                />
              </div>
            </div>
            <div className='mt-6 text-end'>
              <Button type='submit' className='sm:text-[14px] text-[12px]'>
                Update Password
              </Button>
            </div>
          </form>
        </div>
        {/*  */}
        <div className='bg-red-50/70 py-6 px-4 rounded-xl shadow-sm border mt-8 flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold sm:text-base text-[15px] text-red-800'>
              Delete Account
            </h3>
            <p className='sm:text-sm text-[12px] text-red-600 tracking-wide'>
              Permanently remove your account and all order history.{' '}
            </p>
          </div>
          <Button className='text-red-600 border border-red-400 bg-white px-4 py-2 rounded-lg hover:bg-red-50 transition-colors  whitespace-nowrap sm:text-[14px] text-[12px]'>
            Delete Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
