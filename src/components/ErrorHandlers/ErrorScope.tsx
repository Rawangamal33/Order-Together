import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
export interface ErrorScopeProps {
  status: number;
  message: string;
}

const ErrorScope = ({ status, message }: ErrorScopeProps) => {
  const navigate = useNavigate();
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center'>
        <h1 className='inline-block m-0 mr-5 pr-6 text-2xl font-medium leading-[49px] border-r border-black/30 dark:border-white/30'>
          {status}
        </h1>
        <div className='inline-block'>
          <h2 className='text-sm text-red-600 font-normal leading-[49px] m-0'>
            {message || 'Something went wrong. Please try again.'}
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
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ErrorScope;
