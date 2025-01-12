import { useEffect } from 'react';
import { Divider } from '@nextui-org/react';

import { Box, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

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
            mt: 4,
            px: 4,
            '& p': { fontSize: '0.875rem' },
          }}
        >
          {/* <Box sx={{ width: '20%' }}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Typography key={index}>{scoreResult[0]}</Typography>
            ))}
          </Box>
          <Box sx={{ width: '30%' }}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Box sx={{ height: 36, '& div': { width: 120 * (scoreResult[0] ?? 0) } }} key={index}>
                <div className="h-1 bg-gradient-to-r from-blue-300 to-blue-600 rounded-md" />
              </Box>
            ))}
          </Box>
          <Box sx={{ width: '50%' }}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Typography key={index}>{scoreResult[1]}</Typography>
            ))}
          </Box> */}
          <Grid container spacing={2}>
            {dataScoreResult?.interpretation?.map((scoreResult, index) => (
              <Grid key={index} container spacing={2} alignItems="center" sx={{ height: 56 }}>
                <Grid item xs={2}>
                  <Typography>{scoreResult[0]}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    '& div': {
                      width: `${Math.abs(scoreResult[1] ?? 0) / 2}%`,
                      ml: scoreResult[1] > 0 ? '50%' : 0,
                      mr: scoreResult[1] > 0 ? 0 : '50%',
                      justifySelf: scoreResult[1] > 0 ? 'flex-start' : 'flex-end',
                    },
                  }}
                >
                  <div
                    className={`h-1 
                    ${scoreResult[1] > 0 ? 'bg-gradient-to-r from-blue-300 to-blue-600' : 'bg-gradient-to-r from-red-300 to-red-600'}
                    rounded-md`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography>{scoreResult[2]}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
