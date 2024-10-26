import type { DateValue, RangeValue } from '@nextui-org/react';

import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-extraneous-dependencies
import { parseDate } from '@internationalized/date';
import { Button, Tooltip, ButtonGroup, DateRangePicker } from '@nextui-org/react';

import { Box, Grid, Card, Typography, CardContent } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ScoreHistory() {
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>({
    start: parseDate(dayjs().subtract(1, 'week').toDate().toISOString().split('T')[0]),
    end: parseDate(dayjs().toDate().toISOString().split('T')[0]),
  });

  return (
    <>
      <Helmet>
        <title> {`Monitoring - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 5 }}>
          <Typography variant="h4">Monitoring</Typography>

          <Tooltip
            className="max-w-sm"
            closeDelay={200}
            placement="right"
            content="At some point, predictive models may steadily lose their predictive power and need to be updated. It may happen due to the data drift or due to the concept drift. If model rejection rate is stable, the model will probably do a good job"
          >
            <Iconify icon="eva:question-mark-circle-outline" />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <ButtonGroup variant="flat">
            <Button>Today</Button>
            <Button>Week</Button>
            <Button>Month</Button>
            <Button>Quarter</Button>
          </ButtonGroup>

          <DateRangePicker
            className="max-w-xs"
            visibleMonths={2}
            pageBehavior="single"
            variant="faded"
            aria-label="Date Range"
            value={dateRange}
            onChange={setDateRange}
          />
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">credits_data_gm</Typography>
                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', my: 2 }}>
                  <Typography variant="body1">ID 2248</Typography>
                  <Typography variant="body1">3 calculations</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Not enough records to monitor the rejection rate
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 900, mt: 4 }}>
                  Expected Rejection Rate 1.67 %
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
