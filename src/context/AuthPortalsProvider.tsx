import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export interface AuthPortalsContextValueProps {
  activePortal: string | null;
  setActivePortal: Dispatch<SetStateAction<string | null>>;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenForgotPass: () => void;
  onClose: () => void;
}
export const AuthPortalsContext = createContext<
  AuthPortalsContextValueProps | undefined
>(undefined);
const AuthPortalsProvider = ({ children }: { children: ReactNode }) => {
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const onOpenLogin = () => setActivePortal('login');
  const onOpenRegister = () => setActivePortal('register');
  const onOpenForgotPass = () => setActivePortal('forgotPass');
  const onClose = () => setActivePortal(null);
  return (
    <AuthPortalsContext.Provider
      value={{
        activePortal,
        setActivePortal,
        onOpenLogin,
        onOpenRegister,
        onOpenForgotPass,
        onClose,
      }}
    >
      {children}
    </AuthPortalsContext.Provider>
  );
};

export default AuthPortalsProvider;
