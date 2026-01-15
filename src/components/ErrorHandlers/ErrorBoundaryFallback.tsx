import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import type { FallbackProps } from 'react-error-boundary';

const ErrorBoundaryFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();
  const errMsg =
    (error as any)?.data?.title ||
    error?.message ||
    'Something went wrong. Please try again.';
  const errStatus = (error as any)?.status;
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white'>
      <div className='text-center'>
        <div className='flex items-center justify-center'>
          <h1 className='inline-block m-0 mr-5 pr-6 text-2xl font-medium leading-[49px] border-r border-black/30 dark:border-white/30'>
            {errStatus}
          </h1>
          <div className='inline-block'>
            <h2 className='text-sm text-red-600 font-normal leading-[49px] m-0'>
              {errMsg}
            </h2>
          </div>
        </div>

        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            variant='outline'
            className='bg-white text-gray-900 rounded-sm'
            onClick={resetErrorBoundary}
          >
            Retry
          </Button>
          <Button
            variant='outline'
            className='text-white rounded-sm border-[#D83427] bg-orangeColor hover:bg-black hover:text-white'
            onClick={() => navigate('/', { replace: true })}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
