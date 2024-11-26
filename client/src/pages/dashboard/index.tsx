import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Loading } from 'src/components/loading';

import { dashboardActions } from './slice';
import PredictBox from './components/predict-box';
import { selectDashboard } from './slice/selectors';
import BuildModelBox from './components/build-model-box';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const router = useRouter();
  const { loading, uploadData, predictResult } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uploadData) {
      router.push(`/model/${uploadData.id}`);
      dispatch(dashboardActions.resetDashboard());
    }
  }, [dispatch, router, uploadData]);

  useEffect(() => {
    if (predictResult) {
      router.push(`/scoring/${predictResult.id}`);
      dispatch(dashboardActions.resetDashboard());
    }
  }, [dispatch, predictResult, router]);

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

      {loading && <Loading />}
    </>
  );
}
