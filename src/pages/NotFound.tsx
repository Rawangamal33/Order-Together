import { Button } from '@/components/Shared/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white'>
      <div className='text-center'>
        <div className='flex items-center justify-center'>
          <h1 className='inline-block m-0 mr-5 pr-6 text-2xl font-medium leading-[49px] border-r border-black/30 dark:border-white/30'>
            404
          </h1>
          <div className='inline-block'>
            <h2 className='text-sm font-normal leading-[49px] m-0'>
              This page could not be found.
            </h2>
          </div>
        </div>

        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            variant='outline'
            className='bg-white text-gray-900 rounded-sm'
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant='outline'
            className='text-white rounded-sm border-[#D83427] bg-orangeColor hover:bg-black hover:text-white'
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
