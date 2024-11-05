import { CircularProgress, useDisclosure } from '@nextui-org/react';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import StatisticModal from './modal';

// ----------------------------------------------------------------------

export default function StatisticBox() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mr: 4 }}>
              <Typography variant="h6" mb={2}>
                Score Index
              </Typography>
              <CircularProgress
                aria-label="score"
                size="lg"
                value={70}
                color="primary"
                valueLabel={0.7}
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
                  <Typography variant="h6">1000</Typography>
                  <Typography variant="body2">Total records count</Typography>
                </Box>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">300</Typography>
                  <Typography variant="body2">Test records count</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">91.0%</Typography>
                  <Typography variant="body2">Marked as good</Typography>
                </Box>
                <Box sx={{ width: '49%' }}>
                  <Typography variant="h6">9.0%</Typography>
                  <Typography variant="body2">Marked as bad</Typography>
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
              <Button variant="contained">Rebuild 70/30</Button>
              <Button variant="contained">Rebuild 90/10</Button>
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
