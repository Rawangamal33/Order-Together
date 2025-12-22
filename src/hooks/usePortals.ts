import { PortalsContext } from '@/context/PortalsProvider';
import { useContext } from 'react';

export const usePortals = () => {
  const ctxPortal = useContext(PortalsContext);
  if (!ctxPortal) {
    throw new Error('usePortals must be used within an PortalsProvider');
  }
  return ctxPortal;
};
