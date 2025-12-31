import { useDialogContext } from '@/context/DialogProvider';
import { cloneElement, useImperativeHandle, useRef } from 'react';
import DialogCom from './DialogCom';
import type { DialogProps } from '@mui/material/Dialog';

export interface DialogRefProps {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export interface DialogTriggerProps {
  ref?: React.Ref<DialogRefProps | null>;
  trigger: React.ReactElement<any>;
  ariaLabel?: string;
  title?: string;
  subTitle?: string;
  willOpen?: boolean;
  showCloseIcon?: boolean;
  children: React.ReactNode;
  maxWidth: DialogProps['maxWidth'];
}

const DialogTrigger = ({
  ref: externalRef,
  trigger,
  ariaLabel,
  title,
  willOpen,
  subTitle,
  maxWidth,
  showCloseIcon,
  children,
}: DialogTriggerProps) => {
  const internalRef = useRef<DialogRefProps>(null);
  const { dialogRef, isOpen, setIsOpen } = useDialogContext();

  const handleOpen = () => {
    if (willOpen === false) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  const handleClose = () => setIsOpen(false);

  const refToUse = externalRef ?? dialogRef ?? internalRef;

  const actionTrigger = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      handleOpen();
    },
  });
  useImperativeHandle(refToUse, () => ({
    open: handleOpen,
    close: handleClose,
    isOpen,
  }));
  return (
    <div>
      {actionTrigger}
      <DialogCom
        ariaLabel={ariaLabel}
        title={title}
        subTitle={subTitle}
        showCloseIcon={showCloseIcon}
        maxWidth={maxWidth}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {children}
      </DialogCom>
    </div>
  );
};

export default DialogTrigger;
