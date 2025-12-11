import { AuthPortalsContext } from '@/context/AuthPortalsProvider';
import { useContext } from 'react';

export const useAuthPortals = () => {
  const ctxPortal = useContext(AuthPortalsContext);
  if (!ctxPortal) {
    throw new Error(
      'useAuthPortals must be used within an AuthPortalsProvider'
    );
  }
  return ctxPortal;
};
