import { usePortals } from '@/hooks/usePortals';
import { useEffect, type ReactNode } from 'react';
import ReactDom from 'react-dom';

export interface GlobalPortalProps {
  headerSec: ReactNode;
  children: ReactNode;
}
const GlobalPortal = ({ headerSec, children }: GlobalPortalProps) => {
  const { onClose } = usePortals();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const portal = document.getElementById('portal');
  if (!portal) return null;

  return ReactDom.createPortal(
    <section className='flex-center'>
      <div className='fixed inset-0 bg-black/50 z-100' onClick={onClose}></div>
      <div
        className='fixed top-1/7 z-100 bg-white md:w-[480px] sm:w-[65%] w-[90%] h-fit pb-5 rounded-xl py-3.5 px-5'
        role='dialog'
        aria-modal='true'
      >
        <header>{headerSec}</header>
        {children}
      </div>
    </section>,
    portal
  );
};

export default GlobalPortal;
