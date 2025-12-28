import { VscLayoutMenubar } from 'react-icons/vsc';
import Tooltip from '@mui/material/Tooltip';
import { RiEditBoxLine } from 'react-icons/ri';
import DialogTrigger from '../Shared/Dialog/DialogTrigger';
import { WithDialogContext } from '@/context/DialogProvider';
import EditRestaurant from '../Shared/portals/EditRestaurant';
import RestaurantVisibilityDialog from '../Shared/portals/RestaurantVisibilityDialog';
import DeleteRestaurantDialog from '../Shared/portals/DeleteRestaurantDialog';

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
    <div className='flex items-center justify-end gap-2'>
      <Tooltip title='Edit Menu'>
        <button
          className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
            !isVisible && 'disabled'
          }`}
        >
          <VscLayoutMenubar />
        </button>
      </Tooltip>
      <DialogTrigger
        trigger={
          <Tooltip title='Edit Details'>
            <button
              className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
                !isVisible && 'disabled'
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
        willOpen={isVisible ?? false}
      >
        <EditRestaurant id={id} shortCode={shortCode} isVisible={isVisible} />
      </DialogTrigger>

      <RestaurantVisibilityDialog id={id} isVisible={isVisible} />

      <DeleteRestaurantDialog id={id} />
    </div>
  );
};

export default WithDialogContext(RestaurantActions);
