import { useEffect } from 'react';
import { Divider } from '@nextui-org/react';

import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { scoreResultActions } from '../slice';
import { selectScoreResult } from '../slice/selectors';

// ----------------------------------------------------------------------

interface FeatureImportantProps {
  open: boolean;
  rowId: number;
  scoreResultId: number;
  handleClose: () => void;
}

export function FeatureImportant({
  open,
  rowId,
  scoreResultId,
  handleClose,
}: FeatureImportantProps) {
  const { dataScoreResult } = useAppSelector(selectScoreResult);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      dispatch(scoreResultActions.scoreWithInterpretationRequest(scoreResultId));
    }
  }, [dispatch, open, scoreResultId]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Scoring details row #{rowId}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            '& p': { color: 'text.secondary' },
            px: 2,
            mb: 1,
          }}
        >
          <Box sx={{ width: '50%' }}>
            <Typography variant="h3">{dataScoreResult?.score}</Typography>
            <Typography variant="body1">Score</Typography>
          </Box>
          <Box>
            <Typography variant="h3">{dataScoreResult?.resolution}</Typography>
            <Typography variant="body1">Decision</Typography>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            mt: 2,
            px: 2,
            '& p': {
              fontSize: '0.875rem',
              mb: 2,
            },
          }}
        >
          <Box sx={{ width: '50%' }}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Typography key={index}>{scoreResult[0]}</Typography>
            ))}
          </Box>
          <Box sx={{ width: '50%' }}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Typography key={index}>{scoreResult[1]}</Typography>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
