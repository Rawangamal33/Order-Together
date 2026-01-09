import type { MenuItem } from '@/features/menuItems/types/menuItems.types';
import GlobalTable, { type CellProps } from '../Shared/Tables/GlobalTable';
import MenuName from './MenuName';
import AddMenuItem from '../Shared/portals/AddMenuItem';
import EmptyDataTable from '../Shared/Tables/EmptyDataTable';

export interface MenuTableProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  id: string;
  renderControls?: (row: MenuItem) => React.ReactNode;
}

const MenuTable = ({
  menuItems,
  isLoading,
  id,
  renderControls,
}: MenuTableProps) => {
  const cells: CellProps<MenuItem>[] = [
    {
      field: 'name',
      label: 'Menu Item',
      minWidth: 280,
      render: (row) => (
        <MenuName
          name={row.name}
          description={row.description}
          createdAt={row.createdAt}
          isVisible={row.isVisible}
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
      field: 'price',
      label: 'Price',
      render: (row) => <span className='text-[#6b7280]'>{row.price}</span>,
    },
  ];

  if (renderControls) {
    cells.push({
      field: 'id',
      label: 'Actions',
      render: renderControls,
    });
  }

  return (
    <GlobalTable
      ariaLabel='Menu Items Table'
      cells={cells}
      data={menuItems || []}
      emptyDataState={
        <EmptyDataTable
          ariaLabel='Add New Menu Item Dialog'
          title='Add Menu Item'
          headText='No Items in Menu Yet'
          text='Get started by creating your First Menu Item.'
          btnText='Add new Menu item'
        >
          <AddMenuItem id={id} />
        </EmptyDataTable>
      }
      disabledRow={(row) =>
        row.isVisible === false ? 'hidden-row' : undefined
      }
      isLoading={isLoading}
    />
  );
};

export default MenuTable;
