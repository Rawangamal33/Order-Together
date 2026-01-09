import MenuActions from '@/components/Admin/MenuActions';
import MenuTable from '@/components/Admin/MenuTable';
import DialogTrigger from '@/components/Shared/Dialog/DialogTrigger';
import AddMenuItem from '@/components/Shared/portals/AddMenuItem';
import { Button } from '@/components/Shared/ui/button';
import ErrorPage from '@/components/Shared/ui/ErrorPage';
import { WithDialogContext } from '@/context/DialogProvider';
import { useGetMenuItemsQuery } from '@/features/menuItems/menuItemsApi';
import type { MenuItem } from '@/features/menuItems/types/menuItems.types';
import { getInitials } from '@/lib/ImgPlaceholder-utils';
import CircularProgress from '@mui/material/CircularProgress';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const MenuPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return (
      <div className='pt-40 flex flex-col gap-2 items-center text-2xl text-red-600'>
        Invalid restaurant
      </div>
    );
  }
  const { data, isLoading, isError, error } = useGetMenuItemsQuery(id);

  if (isLoading) {
    return (
      <div className='flex-center min-h-screen'>
        <CircularProgress />
      </div>
    );
  }
  if (!isLoading && isError) {
    return (
      <ErrorPage
        status={(error as any)?.status}
        message={(error as any)?.data?.title}
      />
    );
  }
  if (!data) return undefined;
  return (
    <section className='pt-24 min-h-screen px-6 pb-7 bg-[#F9FAFB]'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='sm:flex-row sm:justify-between sm:items-center flex flex-col gap-5 mb-9'>
          <div className='flex items-center gap-4'>
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt='restaurant image'
                className='md:w-16 md:h-16 w-14 h-14 rounded-full object-cover'
              />
            ) : (
              <div className='md:w-16 md:h-16 w-14 h-14 rounded-full flex-center font-bold font-sans text-[24px] text-white shadow-lg border-4 border-white bg-gradient-to-br from-gray-700 to-gray-900'>
                {getInitials(data.name)}
              </div>
            )}
            <div>
              <h1 className='md:text-3xl text-[24px] text-gray-900 font-semibold'>
                {data.name}
              </h1>
              <p className='text-sm font-sans text-gray-500 tracking-wide'>
                Editing Menu • {data.menuItems.length} ITEMS
              </p>
            </div>
          </div>
          <DialogTrigger
            trigger={
              <Button variant='outline' className=' py-5 shadow-sm w-full'>
                <div>
                  <FaPlus />
                </div>
                <span className='font-sans md:text-base text-[13px]'>
                  Add New Item
                </span>
              </Button>
            }
            ariaLabel='Add Menu Item Dialog'
            title='Add Menu Item'
            showCloseIcon={true}
            maxWidth='sm'
          >
            <AddMenuItem id={data.id} />
          </DialogTrigger>
        </div>
        <MenuTable
          menuItems={data.menuItems}
          isLoading={isLoading}
          id={id}
          renderControls={(row: MenuItem) => (
            <MenuActions id={row.id} isVisible={row.isVisible} />
          )}
        />
      </div>
    </section>
  );
};

export default WithDialogContext(MenuPage);
