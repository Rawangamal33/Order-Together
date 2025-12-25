import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogHeader from './DialogHeader';

export interface DialogComProps {
  children: React.ReactNode;
  ariaLabel?: string;
  title?: string;
  subTitle?: string;
  maxWidth: DialogProps['maxWidth'];
  showCloseIcon?: boolean;
  isOpen: boolean;
  onClose: () => void;
}
const DialogCom = ({
  children,
  ariaLabel,
  title,
  subTitle,
  maxWidth,
  showCloseIcon,
  isOpen,
  onClose,
}: DialogComProps) => {
  return (
    <Dialog
      aria-label={ariaLabel}
      aria-modal={true}
      open={isOpen}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
    >
      <DialogHeader
        title={title}
        subTitle={subTitle}
        showCloseIcon={showCloseIcon}
        onClose={onClose}
      />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogCom;
