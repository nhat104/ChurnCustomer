import { Box, Divider, Link, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function FooterSection() {
  return (
    <>
      <Divider />

      <Box
        sx={{
          px: 6,
          py: 2,
          color: 'text.secondary',
          '& a': {
            display: 'inline-flex',
            mr: 2,
            cursor: 'pointer',
            '&:hover': { color: 'text.primary', textDecoration: 'underline' },
          },
        }}
        component="footer"
      >
        <Typography variant="body2" component="span" sx={{ mr: 1 }}>
          No data? Try one of these:
        </Typography>

        <Link variant="body2" href="/assets/data/Churn_Modelling.csv" download color="inherit">
          Churn Customers.csv
          <Iconify width={18} icon="iconoir:download" />
        </Link>
        <Typography variant="body2" component="a">
          Brokerage.xls
          <Iconify width={18} icon="iconoir:download" />
        </Typography>
        <Typography variant="body2" component="a">
          Telecom.xls
          <Iconify width={18} icon="iconoir:download" />
        </Typography>
        {/* <Box component="img" src="/assets/icons/ic-download.svg" /> */}
      </Box>
    </>
  );
}
