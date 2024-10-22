import type { ChangeEvent } from 'react';

import { Helmet } from 'react-helmet-async';

import { Box, Card, Input, Button, Typography, CardContent, OutlinedInput } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
  };

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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 5, mx: 8 }}>
          <Card sx={{ width: 'calc(50% - 10px)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ mt: 4, mb: 3, fontSize: '1.8rem !important' }}>
                Build a model
              </Typography>

              <form onSubmit={(e) => e.preventDefault()}>
                {/* <input type="hidden" name='_csrf' /> */}
                <Box sx={{ width: 250, mb: 6 }}>
                  <OutlinedInput
                    fullWidth
                    name="modelName"
                    inputProps={{
                      minLength: 2,
                      maxLength: 30,
                    }}
                    placeholder="Enter the model name"
                    size="small"
                    sx={{ mb: 4 }}
                  />

                  <Button
                    component="label"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ fontSize: 16 }}
                  >
                    Upload Data
                    <Input
                      type="file"
                      inputProps={{
                        accept:
                          'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      }}
                      onChange={onUploadFile}
                      sx={{ display: 'none' }}
                    />
                  </Button>

                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    or drag and drop a file
                    <br />
                    xlsx or tab-delimited csv only
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>

          <Card sx={{ width: 'calc(50% - 10px)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ mt: 4, mb: 3, fontSize: '1.8rem !important' }}>
                Start Predicting
              </Typography>

              <form onSubmit={(e) => e.preventDefault()}>
                {/* <input type="hidden" name='_csrf' /> */}
                <Box sx={{ width: 250, mb: 6 }}>
                  <OutlinedInput
                    fullWidth
                    name="modelName"
                    inputProps={{
                      minLength: 2,
                      maxLength: 30,
                    }}
                    placeholder="Choose existing model"
                    size="small"
                    sx={{ mb: 4 }}
                  />

                  <Button
                    component="label"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ fontSize: 16 }}
                  >
                    Upload Data
                    <Input type="file" onChange={onUploadFile} sx={{ display: 'none' }} />
                  </Button>

                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    or drag and drop a file
                    <br />
                    xlsx or tab-delimited csv only
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}
