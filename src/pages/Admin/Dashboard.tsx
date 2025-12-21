import RestaurantActions from '@/components/Admin/RestaurantActions';
import RestaurantsTable from '@/components/Admin/RestaurantsTable';
import { Button } from '@/components/Shared/ui/button';
import type { Restaurant } from '@/types/restaurants.types';
import { FaPlus } from 'react-icons/fa6';

const Dashboard = () => {
  return (
    <div className='pt-20 min-h-screen px-6 pb-7 bg-[#F9FAFB]'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='sm:flex-row sm:justify-between sm:items-center flex flex-col gap-4 mb-9'>
          <div className='space-y-[0.1rem]'>
            <h1 className='text-[24px] font-semibold font-sans'>
              Restaurant Management
            </h1>
            <p className='text-gray-600 text-sm tracking-wide'>
              Manage visibility and profiles.
            </p>
          </div>
          <Button variant='outline' className='text-gray-700 py-5 shadow-sm'>
            <div>
              <FaPlus />
            </div>
            <span className='font-sans md:text-[15px] text-[13px]'>
              Add New Restaurant
            </span>
          </Button>
        </div>
        <RestaurantsTable
          renderControls={(row: Restaurant) => (
            <RestaurantActions isVisible={row.isVisible} />
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
