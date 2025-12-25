import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { CgClose } from 'react-icons/cg';

export interface DialogHeaderProps {
  title?: string;
  subTitle?: string;
  showCloseIcon?: boolean;
  onClose?: () => void;
}
const DialogHeader = ({
  title,
  subTitle,
  showCloseIcon,
  onClose,
}: DialogHeaderProps) => {
  return (
    <DialogTitle>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold font-sans text-gray-950 text-[20px]'>
          {title}
        </h1>
        {showCloseIcon && (
          <IconButton onClick={onClose} aria-label='Close Dialog'>
            <CgClose />
          </IconButton>
        )}
      </div>
      <p>{subTitle}</p>
    </DialogTitle>
  );
};

export default DialogHeader;
