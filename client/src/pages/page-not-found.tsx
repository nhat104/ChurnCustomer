import { Helmet } from 'react-helmet-async';

import { Box, Button, Container, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <SimpleLayout content={{ compact: true }}>
        <Container>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration-404.svg"
            sx={{
              width: 320,
              height: 'auto',
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button component={RouterLink} href="/" size="large" variant="contained" color="inherit">
            Go to home
          </Button>
        </Container>
      </SimpleLayout>
    </>
  );
}
