import { CircularProgress, Divider } from '@nextui-org/react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { useAppSelector } from 'src/store/hooks';
import { selectModel } from 'src/pages/model-detail/slice/selectors';

// ----------------------------------------------------------------------

export function ModelOverview() {
  const { dataModel } = useAppSelector(selectModel);
  if (!dataModel) {
    return null;
  }
  const { attributes } = dataModel;

  return (
    <Card sx={{ bgcolor: 'background.neutral', mt: 4 }}>
      <CardContent sx={{ '& p': { color: 'text.secondary' } }}>
        <Box sx={{ p: 2, pb: 3 }}>
          <Typography variant="h5">Model overview</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="h6">{attributes?.total_records}</Typography>
              <Typography variant="body2">Total records count</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{attributes?.no_columns} columns</Typography>
              <Typography variant="body2">Target column: ok</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{attributes?.test_records}</Typography>
              <Typography variant="body2">Test records count</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{attributes?.exit_percentage}%</Typography>
              <Typography variant="body2">Mark as exit</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{attributes?.stay_percentage}%</Typography>
              <Typography variant="body2">Marked as stay</Typography>
            </Box>
            <Box>
              <Typography variant="h6">9.00%</Typography>
              <Typography variant="body2">NLP by source data</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress
            aria-label="score"
            size="lg"
            value={(dataModel?.predictive_power ?? 0) * 100}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  {dataModel?.predictive_power}
                </Typography>
                <Typography variant="body2">Score Index</Typography>
              </Box>
            }
            showValueLabel
            classNames={{
              svg: 'w-36 h-36 stroke-1',
              value: 'text-3xl font-semibold',
            }}
          />
          <CircularProgress
            aria-label="roc aug"
            size="lg"
            value={+(attributes?.roc_auc ?? 0) * 100}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  {attributes?.roc_auc}
                </Typography>
                <Typography variant="body2">ROC AUG</Typography>
              </Box>
            }
            showValueLabel
            classNames={{
              svg: 'w-36 h-36 stroke-1',
              value: 'text-3xl font-semibold',
            }}
          />
          <CircularProgress
            aria-label="k-s score"
            size="lg"
            value={+(attributes?.ks_score_attr?.ks_statistic ?? 0) * 100}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  {attributes?.ks_score_attr?.ks_statistic}
                </Typography>
                <Typography variant="body2">K-S Score</Typography>
              </Box>
            }
            showValueLabel
            classNames={{
              svg: 'w-36 h-36 stroke-1',
              value: 'text-3xl font-semibold',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
