import { useGetRestaurantsQuery } from '@/features/restuarants/restaurantsApi';
import type { CellProps } from '../Shared/ui/GlobalTable';
import type { Restaurant } from '@/types/restaurants.types';
import GlobalTable from '../Shared/ui/GlobalTable';
import RestaurantName from './RestaurantName';
import type { ReactNode } from 'react';
import CreateRestaurant from '../Shared/portals/CreateRestaurant';
import EmptyDataTable from '../Shared/ui/EmptyDataTable';
import ErrorScope from '../Shared/ui/ErrorScope';

export interface RestauranrTableProps {
  renderControls?: (row: Restaurant) => ReactNode;
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

  if (!isLoading && isError) {
    return (
      <ErrorScope
        status={(error as any)?.status}
        message={(error as any)?.data?.title}
      />
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
      emptyDataState={
        <EmptyDataTable
          ariaLabel='Add Restaurant Dialog'
          title='Create New Restaurant'
          headText='No Restaurants Yet'
          text=' Get started by creating your First Restaurant.'
          btnText='Add new Restaurant'
        >
          <CreateRestaurant />
        </EmptyDataTable>
      }
    />
  );
};

export default RestaurantsTable;
