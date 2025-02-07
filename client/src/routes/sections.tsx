import { lazy, Suspense, type ReactElement } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { useAppSelector } from 'src/store/hooks';
import { DashboardLayout } from 'src/layouts/dashboard';
import { selectAuth } from 'src/pages/sign-in/slice/selectors';
import { DashboardPublicLayout } from 'src/layouts/dashboard-public';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const ModelPage = lazy(() => import('src/pages/models'));
export const ModelDetailPage = lazy(() => import('src/pages/model-detail'));
export const ScoreHistoryPage = lazy(() => import('src/pages/score-history'));
export const ScoreHistoryPublicPage = lazy(() => import('src/pages/score-history-public'));
export const ScoreDetailPage = lazy(() => import('src/pages/score-detail'));
// export const MonitoringPage = lazy(() => import('src/pages/monitoring'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const AuthRoute = (props: { type: 'PUBLIC' | 'PRIVATE'; children: ReactElement }) => {
  const { type, children } = props;
  const { dataAuth } = useAppSelector(selectAuth);

  if (type === 'PUBLIC' && !dataAuth?.access_token) {
    return children;
  }

  if (type === 'PRIVATE' && dataAuth?.access_token) {
    return children;
  }

  const { pathname } = window.location;

  if (pathname === '/' && !dataAuth?.access_token) {
    return <Navigate to="/scores" />;
  }

  return <Navigate to={type === 'PRIVATE' ? '/sign-in' : '/404'} />;
  // return <Navigate to="/404" />;

  // if (type === 'PRIVATE' && !dataAuth?.access_token) {
  //   return <Navigate to="/score" />;
  // }

  // if (type === 'PUBLIC' && dataAuth?.access_token) {
  //   return <Navigate to="/" />;
  // }

  // return children;
};

export function Router() {
  return useRoutes([
    {
      element: (
        <AuthRoute type="PRIVATE">
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthRoute>
      ),
      children: [
        { element: <DashboardPage />, index: true },
        {
          path: 'model',
          children: [
            { element: <ModelPage />, index: true },
            { path: ':modelId', element: <ModelDetailPage /> },
          ],
        },
        {
          path: 'scoring',
          children: [
            { element: <ScoreHistoryPage />, index: true },
            { path: ':scoreId', element: <ScoreDetailPage /> },
          ],
        },
      ],
    },
    {
      path: 'scores',
      element: (
        <AuthRoute type="PUBLIC">
          <DashboardPublicLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardPublicLayout>
        </AuthRoute>
      ),
      children: [
        { element: <ScoreHistoryPublicPage />, index: true },
        {
          path: ':scoreId',
          element: <ScoreDetailPage />,
        },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
