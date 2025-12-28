import type { MenuItem } from '@/types/menuItems.types';
import GlobalTable, { type CellProps } from '../Shared/ui/GlobalTable';
import MenuName from './MenuName';

export interface MenuTableProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  renderControls?: (row: MenuItem) => React.ReactNode;
}

const MenuTable = ({
  menuItems,
  isLoading,
  renderControls,
}: MenuTableProps) => {
  const cells: CellProps<MenuItem>[] = [
    {
      field: 'name',
      label: 'Menu Item',
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
      disabledRow={(row) =>
        row.isVisible === false ? 'hidden-row' : undefined
      }
      isLoading={isLoading}
    />
  );
};

export default MenuTable;
