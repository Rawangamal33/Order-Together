import { VscLayoutMenubar } from 'react-icons/vsc';
import Tooltip from '@mui/material/Tooltip';
import { RiEditBoxLine } from 'react-icons/ri';
import DialogTrigger from '../Dialogs/DialogTrigger';
import { WithDialogContext } from '@/context/DialogProvider';
import { NavLink } from 'react-router-dom';
import EditRestaurant from '../portals/EditRestaurant';
import RestaurantVisibilityDialog from '../portals/RestaurantVisibilityDialog';
import DeleteRestaurantDialog from '../portals/DeleteRestaurantDialog';

export interface RestaurantActionsProps {
  id: string;
  shortCode: string;
  isVisible: boolean;
}

const RestaurantActions = ({
  id,
  shortCode,
  isVisible,
}: RestaurantActionsProps) => {
  return (
    <div className='flex-center gap-2'>
      <Tooltip title='Show Menu'>
        <NavLink
          to={`/admin/restaurants/${id}/menu-items`}
          className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
            !isVisible && 'text-[#b8bcc3]'
          }`}
        >
          <VscLayoutMenubar />
        </NavLink>
      </Tooltip>
      <DialogTrigger
        trigger={
          <Tooltip title='Edit Details'>
            <button
              className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
                !isVisible && 'text-[#b8bcc3]'
              }`}
            >
              <RiEditBoxLine />
            </button>
          </Tooltip>
        }
        ariaLabel='Edit Restaurant Details Dialog'
        title='Edit Restaurant Details'
        showCloseIcon={true}
        maxWidth='sm'
      >
        <EditRestaurant id={id} shortCode={shortCode} isVisible={isVisible} />
      </DialogTrigger>

      <RestaurantVisibilityDialog id={id} isVisible={isVisible} />

      <DeleteRestaurantDialog id={id} />
    </div>
  );
};

export default WithDialogContext(RestaurantActions);
