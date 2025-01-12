import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function AuthLayout({ sx, children, header }: AuthLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: { maxWidth: false },
            toolbar: { sx: { bgcolor: 'transparent', backdropFilter: 'unset' } },
          }}
          sx={{
            position: { [layoutQuery]: 'fixed' },

            ...header?.sx,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: <Logo />,
            rightArea: (
              <Link
                component={RouterLink}
                href="#"
                color="inherit"
                sx={{ typography: 'subtitle2' }}
              >
                Need help?
              </Link>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-auth-content-width': '420px',
        '--layout-signin-content-width': '420px',
        '--layout-signup-content-width': '600px',
      }}
      sx={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        // backgroundImage: `url(/assets/background/overlay.jpg)`,
        background:
          'linear-gradient(rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.24)), url(/assets/background/overlay.jpg)',
        // '&::before': {
        //   width: 1,
        //   height: 1,
        //   zIndex: -1,
        //   content: "''",
        //   opacity: 0.24,
        //   position: 'fixed',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundPosition: 'center center',
        //   backgroundImage: `url(/assets/background/overlay.jpg)`,
        //   [stylesMode.dark]: { opacity: 0.08 },
        // },
        ...sx,
      }}
    >
      <Main layoutQuery={layoutQuery}>{children}</Main>
    </LayoutSection>
  );
}
