import Tooltip from '@mui/material/Tooltip';
import { RiEditBoxLine } from 'react-icons/ri';
import DialogTrigger from '../Shared/Dialog/DialogTrigger';
import { WithDialogContext } from '@/context/DialogProvider';
import MenuItemVisibilityDialog from '../Shared/portals/MenuItemVisibilityDialog';
import DeleteMenuItemDialog from '../Shared/portals/DeleteMenuItemDialog';
import EditMenuItem from '../Shared/portals/EditMenuItem';

export interface MenuActionsProps {
  id: string;
  isVisible: boolean;
}

const MenuActions = ({ id, isVisible }: MenuActionsProps) => {
  return (
    <div className='flex-center gap-2'>
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
        ariaLabel='Edit Menu Item Dialog'
        title='Edit Menu Item'
        showCloseIcon={true}
        maxWidth='sm'
      >
        <EditMenuItem id={id} />
      </DialogTrigger>

      <MenuItemVisibilityDialog id={id} isVisible={isVisible} />

      <DeleteMenuItemDialog id={id} />
    </div>
  );
};

export default WithDialogContext(MenuActions);
