import { CircularProgress, Divider } from '@nextui-org/react';

import { Box, Card, CardContent, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function ModelOverview() {
  return (
    <Card sx={{ bgcolor: 'background.neutral', mt: 4 }}>
      <CardContent sx={{ '& p': { color: 'text.secondary' } }}>
        <Box sx={{ p: 2, pb: 3 }}>
          <Typography variant="h5">Model overview</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="h6">1000</Typography>
              <Typography variant="body2">Total records count</Typography>
            </Box>
            <Box>
              <Typography variant="h6">25 columns</Typography>
              <Typography variant="body2">Target column: ok</Typography>
            </Box>
            <Box>
              <Typography variant="h6">300</Typography>
              <Typography variant="body2">Test records count</Typography>
            </Box>
            <Box>
              <Typography variant="h6">91.0%</Typography>
              <Typography variant="body2">Marked as good</Typography>
            </Box>
            <Box>
              <Typography variant="h6">9.0%</Typography>
              <Typography variant="body2">Mark as bad</Typography>
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
            value={70}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  0.70
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
            value={85}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  0.85
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
            value={58}
            color="primary"
            valueLabel={
              <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                <Typography component="span" sx={{ fontSize: '2rem' }}>
                  0.58
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