import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';

const Modal = ({ open, handleClose, children }) => {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
