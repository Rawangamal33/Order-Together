import { VscLayoutMenubar } from 'react-icons/vsc';
import Tooltip from '@mui/material/Tooltip';
import { RiEditBoxLine } from 'react-icons/ri';
import { IoMdEye } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa';

const RestaurantActions = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className='flex items-center justify-end gap-2'>
      <Tooltip title='Edit Menu'>
        <button
          className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
            !isVisible && 'disabled'
          }`}
        >
          <VscLayoutMenubar />
        </button>
      </Tooltip>
      <Tooltip title='Edit Details'>
        <button
          className={`action-btn text-[#1976d2] hover:bg-[#48baee14] ${
            !isVisible && 'disabled'
          }`}
        >
          <RiEditBoxLine />
        </button>
      </Tooltip>
      <Tooltip title={`${isVisible ? 'Visible' : 'Not Visible'}`}>
        <button
          className={`action-btn ${
            isVisible ? 'eyeVisibility' : 'eyeUnVisibility'
          }`}
        >
          {isVisible ? <IoMdEye /> : <FaRegEyeSlash />}
        </button>
      </Tooltip>
      <Tooltip title='Delete'>
        <button className='action-btn text-[#ee2f2f] hover:bg-[#fee2e2]'>
          <MdDelete />
        </button>
      </Tooltip>
    </div>
  );
};

export default RestaurantActions;
