/**
 *
 * Alert
 *
 */
import React, { memo } from 'react';

import { type AlertProps, Alert as MuiAlert, Snackbar } from '@mui/material';

interface Props extends AlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const Alert = memo(({ open, onClose, message, ...props }: Props) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        {...props}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
});
