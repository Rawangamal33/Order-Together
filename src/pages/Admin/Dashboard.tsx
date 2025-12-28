import RestaurantActions from '@/components/Admin/RestaurantActions';
import RestaurantsTable from '@/components/Admin/RestaurantsTable';
import DialogTrigger from '@/components/Shared/Dialog/DialogTrigger';
import CreateRestaurant from '@/components/Shared/portals/CreateRestaurant';
import { Button } from '@/components/Shared/ui/button';
import { WithDialogContext } from '@/context/DialogProvider';
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
          <DialogTrigger
            trigger={
              <Button
                variant='outline'
                className='text-gray-700 py-5 shadow-sm'
              >
                <div>
                  <FaPlus />
                </div>
                <span className='font-sans md:text-[15px] text-[13px]'>
                  Add New Restaurant
                </span>
              </Button>
            }
            ariaLabel='Add Restaurant Dialog'
            title='Create New Restaurant'
            showCloseIcon={true}
            maxWidth='sm'
          >
            <CreateRestaurant />
          </DialogTrigger>
        </div>
        <RestaurantsTable
          renderControls={(row: Restaurant) => (
            <RestaurantActions
              id={row.id}
              shortCode={row.shortCode}
              isVisible={row.isVisible}
            />
          )}
        />
      </div>
    </div>
  );
};

export default WithDialogContext(Dashboard);
