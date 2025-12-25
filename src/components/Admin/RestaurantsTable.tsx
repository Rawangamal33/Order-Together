import { useGetRestaurantsQuery } from '@/features/restuarants/restaurantsApi';
import type { CellProps } from '../Shared/ui/GlobalTable';
import type { Restaurant } from '@/types/restaurants.types';
import GlobalTable from '../Shared/ui/GlobalTable';
import RestaurantName from './RestaurantName';
import type { ReactNode } from 'react';
import DialogTrigger from '../Shared/Dialog/DialogTrigger';
import CreateRestaurant from '../Shared/portals/CreateRestaurant';

export interface RestauranrTableProps {
  renderControls: (row: Restaurant) => ReactNode;
}
const RestaurantsTable = ({ renderControls }: RestauranrTableProps) => {
  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useGetRestaurantsQuery();

  let cells: CellProps<Restaurant>[] = [
    {
      field: 'name',
      label: 'Restaurant',
      render: (row) => (
        <RestaurantName
          logoUrl={row.logoUrl}
          isVisible={row.isVisible}
          name={row.name}
          createdAt={row.createdAt}
        />
      ),
    },
    {
      field: 'isVisible',
      label: 'Status',
      render: (row) => (
        <span
          className={`statusBase ${
            row.isVisible ? 'statusVisible' : 'statusHidden'
          }`}
        >
          {row.isVisible ? 'Visible' : 'Hidden'}
        </span>
      ),
    },
    {
      field: 'menuItemCount',
      label: 'Menu Items',
      render: (row) => (
        <span className='text-[#6b7280]'>{row.menuItemCount}</span>
      ),
    },
  ];

  if (renderControls) {
    cells.push({
      field: 'id',
      label: 'Actions',
      render: renderControls,
    });
  }

  const emptyDataState = (
    <>
      <p className='text-center mt-5 text-xl font-semibold text-blue-600'>
        No Restaurants Yet
      </p>
      <p className='text-center text-lg  text-gray-500'>
        Get started by creating your First Restaurant.
      </p>

      <div className='mb-5'>
        <DialogTrigger
          trigger={
            <button className='flex-center gap-2 mx-auto mt-4 shadow-md py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-md'>
              <span className='font-sans text-gray-600 font-semibold'>
                Add new Restaurant
              </span>
            </button>
          }
          ariaLabel='Add Restaurant Dialog'
          title='Create New Restaurant'
          showCloseIcon={true}
          maxWidth='sm'
        >
          <CreateRestaurant />
        </DialogTrigger>
      </div>
    </>
  );

  if (!isLoading && isError) {
    return (
      <div className='text-center py-8 text-red-600'>
        <p className='text-lg font-semibold'>Failed to load restaurants</p>
        <p className='text-sm text-red-500'>
          {(error as any)?.title || 'Something Went Wrong'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded cursor-pointer'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <GlobalTable
      ariaLabel='Restaurants Table'
      cells={cells}
      data={restaurants || []}
      disabledRow={(row) =>
        row.isVisible === false ? 'hidden-row' : undefined
      }
      isLoading={isLoading}
      emptyDataState={emptyDataState}
    />
  );
};

export default RestaurantsTable;
