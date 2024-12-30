import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { scoreResultActions } from 'src/pages/score-detail/slice';

// ----------------------------------------------------------------------

interface DeleteScoreHistoryProps {
  open: boolean;
  modelId: number | number[];
  handleClose: () => void;
}

export function DeleteScoreHistory({ open, modelId, handleClose }: DeleteScoreHistoryProps) {
  const dispatch = useAppDispatch();

  const handleConfirmDelete = () => {
    if (Array.isArray(modelId)) {
      modelId.forEach((id) => {
        dispatch(scoreResultActions.deleteScoreHistoryRequest(id));
      });
    } else {
      dispatch(scoreResultActions.deleteScoreHistoryRequest(modelId));
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{' '}
          {Array.isArray(modelId) ? 'these prediction histories' : 'this prediction history'}? You
          can&apos;t undo this action afterward.
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
