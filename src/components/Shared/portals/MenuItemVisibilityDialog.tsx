import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { IoMdEye } from 'react-icons/io';
import { FaRegEyeSlash } from 'react-icons/fa';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  py: 4,
  px: 2,
  borderRadius: 2,
  width: { xs: '80%', sm: 400, md: 450 },
};

export default function MenuItemVisibilityDialog({
  id,
  isVisible,
}: {
  id: string;
  isVisible: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title={`${isVisible ? 'Visible' : 'Not Visible'}`}>
        <button
          className={`action-btn ${
            isVisible ? 'eyeVisibility' : 'eyeUnVisibility'
          }`}
          onClick={handleOpen}
        >
          {isVisible ? <IoMdEye /> : <FaRegEyeSlash />}
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h2 className='text-gray-600 text-center font-sans text-lg'>
            {isVisible
              ? 'Do you want to Hide this Menu Item from users?'
              : 'Do you want to make this Menu Item Visible to users?'}
          </h2>
          <div className='flex justify-between items-center mt-6'>
            <Button>Yes</Button>
            <Button
              onClick={handleClose}
              sx={{
                color: '#ee2f2f',
                '&:hover': {
                  background: '#fee2e2',
                },
              }}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
