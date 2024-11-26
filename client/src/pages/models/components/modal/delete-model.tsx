import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { modelActions } from 'src/pages/model-detail/slice';

// ----------------------------------------------------------------------

interface DeleteModalProps {
  open: boolean;
  modelId: number;
  handleClose: () => void;
}

export function DeleteModel({ open, modelId, handleClose }: DeleteModalProps) {
  const dispatch = useAppDispatch();

  const handleConfirmDelete = () => {
    dispatch(modelActions.deleteModelRequest(modelId));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this model? This action will also delete all score
          histories for this model!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" color="error" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
