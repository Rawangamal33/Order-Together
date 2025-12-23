import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export interface PortalsContextValueProps {
  activePortal: string | null;
  setActivePortal: Dispatch<SetStateAction<string | null>>;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenForgotPass: () => void;
  onOpenCreateRestaurant: () => void;
  onClose: () => void;
}
export const PortalsContext = createContext<
  PortalsContextValueProps | undefined
>(undefined);
const PortalsProvider = ({ children }: { children: ReactNode }) => {
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const onOpenLogin = () => setActivePortal('login');
  const onOpenRegister = () => setActivePortal('register');
  const onOpenForgotPass = () => setActivePortal('forgotPass');
  const onOpenCreateRestaurant = () => setActivePortal('createRestaurant');
  const onClose = () => setActivePortal(null);
  return (
    <PortalsContext.Provider
      value={{
        activePortal,
        setActivePortal,
        onOpenLogin,
        onOpenRegister,
        onOpenForgotPass,
        onOpenCreateRestaurant,
        onClose,
      }}
    >
      {children}
    </PortalsContext.Provider>
  );
};

export default PortalsProvider;
