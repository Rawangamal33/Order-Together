import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { MdDelete } from 'react-icons/md';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  py: 2.5,
  px: 3,
  borderRadius: 4,
  width: { xs: '80%', sm: 400, md: 450 },
};

export default function DeleteMenuItemDialog({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title='Delete'>
        <button
          className='action-btn text-[#ee2f2f] hover:bg-[#fee2e2]'
          onClick={handleOpen}
        >
          <MdDelete />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h2 className='text-gray-800 font-medium font-sans text-xl '>
            Confirm Action
          </h2>
          <p className='mt-4 text-gray-500'>
            Are you sure you want to Delete this Menu Item?
          </p>
          <div className='flex justify-between items-center mt-5'>
            <Button
              autoFocus
              tabIndex={0}
              sx={{
                color: '#ee2f2f',
                '&:hover': {
                  background: '#fee2e2',
                  borderRadius: '20px',
                },
              }}
            >
              Yes
            </Button>
            <Button
              sx={{
                '&:hover': {
                  borderRadius: '20px',
                },
              }}
              onClick={handleClose}
              tabIndex={0}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
