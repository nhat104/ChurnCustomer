import { Helmet } from 'react-helmet-async';

import { Box, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PredictBox from './components/predict-box';
import BuildModelBox from './components/build-model-box';

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <DashboardContent sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h1" sx={{ fontWeight: 600 }}>
          Predicting Churn
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            my: 5,
            mx: 8,
            '& > div': { width: 'calc(50% - 10px)' },
          }}
        >
          <BuildModelBox />

          <PredictBox />
        </Box>
      </DashboardContent>
    </>
  );
}
