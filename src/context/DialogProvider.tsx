import type { DialogRefProps } from '@/components/Dialogs/DialogTrigger';
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ComponentType,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export interface DialogContextValuesProps {
  dialogRef: React.RefObject<DialogRefProps | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextValuesProps | undefined>(
  undefined
);

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<DialogRefProps | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ dialogRef, isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogContext must be used within a DialogProvider');
  }
  return context;
};

export const WithDialogContext = <P extends {}>(
  Component: ComponentType<P>
) => {
  return function passingPropsTypes(props: P) {
    return (
      <DialogProvider>
        <Component {...props} />
      </DialogProvider>
    );
  };
};

export default DialogProvider;
