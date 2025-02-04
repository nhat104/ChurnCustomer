import { CircularProgress, useDisclosure } from '@nextui-org/react';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import StatisticModal from './modal';
import { modelActions } from '../../slice';
import { selectModel } from '../../slice/selectors';

// ----------------------------------------------------------------------

export default function StatisticBox() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { dataModel } = useAppSelector(selectModel);
  const dispatch = useAppDispatch();
  if (!dataModel) {
    return null;
  }

  const { attributes } = dataModel;

  const handleRebuildModel = (testSize: number) => {
    dispatch(modelActions.rebuildModelRequest([dataModel.id, testSize]));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mr: 4 }}>
              <Typography variant="h6" mb={2}>
                Gini Index
              </Typography>
              <CircularProgress
                aria-label="score"
                size="lg"
                value={(dataModel?.predictive_power ?? 0) * 100}
                color="primary"
                valueLabel={Number(dataModel?.predictive_power).toFixed(2)}
                showValueLabel
                classNames={{
                  svg: 'w-36 h-36 stroke-1',
                  // indicator: 'stroke-white',
                  // track: 'stroke-white/10',
                  value: 'text-3xl font-semibold',
                }}
              />
            </Box>

            <Box sx={{ flex: 1, '& p': { color: 'text.secondary' } }}>
              <Typography variant="h6" mb={3}>
                Dataset statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">{attributes?.total_records}</Typography>
                  <Typography variant="body2">Total records count</Typography>
                </Box>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">{attributes?.test_records}</Typography>
                  <Typography variant="body2">Test records count</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">{attributes?.exit_percentage}%</Typography>
                  <Typography variant="body2">Marked as churn</Typography>
                </Box>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">{attributes?.stay_percentage}%</Typography>
                  <Typography variant="body2">Marked as stay</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={() => handleRebuildModel(0.3)}>
                Rebuild 70/30
              </Button>
              <Button variant="contained" onClick={() => handleRebuildModel(0.1)}>
                Rebuild 90/10
              </Button>
            </Box>

            <Typography
              variant="body2"
              onClick={onOpen}
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Model detail
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <StatisticModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
