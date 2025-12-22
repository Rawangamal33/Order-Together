import { usePortals } from '@/hooks/usePortals';
import type { ReactNode } from 'react';
import ReactDom from 'react-dom';

export interface GlobalPortalProps {
  children: ReactNode;
  headerSec: ReactNode;
}
const GlobalPortal = ({ children, headerSec }: GlobalPortalProps) => {
  const portal = document.getElementById('portal');
  if (!portal) return;

  const { onClose } = usePortals();
  return ReactDom.createPortal(
    <section className='flex-center'>
      <div className='fixed inset-0 bg-black/50 z-100' onClick={onClose}></div>
      <div
        className='fixed top-1/7 z-100 bg-white md:w-[500px] sm:w-[65%] w-[80%] h-fit pb-5 rounded-xl py-3.5 px-5'
        role='dialog'
        aria-modal='true'
      >
        <div>{headerSec}</div>
        {children}
      </div>
    </section>,
    portal
  );
};

export default GlobalPortal;
