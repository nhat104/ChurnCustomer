import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Alert, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { MainPublic } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { FooterSection } from '../core/footer-section';
import { navDataPublic } from '../config-nav-dashboard';

// ----------------------------------------------------------------------

export type DashboardPublicLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardPublicLayout({ sx, children, header }: DashboardPublicLayoutProps) {
  const theme = useTheme();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile data={navDataPublic} open={navOpen} onClose={() => setNavOpen(false)} />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => router.push('/sign-in')}>
                  Sign In
                </Button>
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={<NavDesktop data={navDataPublic} layoutQuery={layoutQuery} />}
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<FooterSection />}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '280px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <MainPublic>{children}</MainPublic>
    </LayoutSection>
  );
}
