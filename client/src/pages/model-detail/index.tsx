import type { ChangeEvent } from 'react';

import { Helmet } from 'react-helmet-async';
import {
  Modal,
  Divider,
  Tooltip,
  Progress,
  ModalBody,
  ModalContent,
  useDisclosure,
  CircularProgress,
} from '@nextui-org/react';

import {
  Box,
  Grid,
  Card,
  alpha,
  Input,
  Button,
  useTheme,
  Typography,
  CardContent,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function ModelDetail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
  };

  const theme = useTheme();

  const chart = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    series: [
      { name: 'Good', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
      { name: 'Bad', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
    ],
  };

  const chartColors = [theme.palette.primary.dark, alpha(theme.palette.primary.light, 0.64)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
    },
    labels: chart.series.map((item) => item.name),
    grid: { show: false },
    xaxis: {
      categories: chart.categories,
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: { text: 'Month', style: { fontSize: '14px', fontWeight: 400 } },
    },
    yaxis: {
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: { text: 'Density', style: { fontSize: '14px', fontWeight: 400 } },
    },
    // legend: {
    //   show: true,
    //   floating: true,
    //   position: 'left',
    //   offsetX: -160,
    // },
    // tooltip: {
    //   y: {
    //     formatter: (value: number) => `${value} visits`,
    //   },
    // },
  });

  return (
    <>
      <Helmet>
        <title> {`Scoring model - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <DashboardContent>
        <Typography variant="h4">credits_data_gm</Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
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
          </Grid>

          <Grid item xs={6} md={3}>
            <Card sx={{ pb: '6px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', '& > :nth-of-type(2)': { color: 'grey.700' } }}>
                  <Typography variant="h6">Cutoff selection</Typography>
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    {Number(0.5).toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ my: 2 }}>
                  <Progress
                    size="md"
                    radius="sm"
                    classNames={{
                      base: 'max-w-md',
                      track: 'drop-shadow-md',
                      indicator: 'bg-gradient-to-r from-yellow-100 to-green-500',
                    }}
                    aria-label="cutoff selection"
                    value={50}
                  />
                </Box>

                <Box sx={{ color: 'text.secondary' }}>
                  <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                    Total applications count: 300
                  </Typography>
                  <Tooltip
                    className="max-w-48"
                    placement="bottom-start"
                    closeDelay={200}
                    content="Total number of records Machine sets aside to validate the quality of the model and calculate the Score Index"
                  >
                    <Iconify width={14} icon="eva:question-mark-circle-outline" />
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& > div': {
                      '& > :first-child': { mt: 1, mb: 0.5 },
                      '& > :not(:first-child)': { color: 'text.secondary', lineHeight: 1 },
                    },
                  }}
                >
                  <Box sx={{ width: '49%' }}>
                    <Typography variant="h6">295</Typography>
                    <Typography variant="body2">to be approved</Typography>
                    <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                      297 / 22
                    </Typography>
                    <Tooltip
                      className="max-w-52"
                      placement="bottom-start"
                      content="Ratio of correctly approved to incorrectly approved"
                    >
                      <Iconify width={14} icon="eva:question-mark-circle-outline" />
                    </Tooltip>
                  </Box>
                  <Box sx={{ width: '49%' }}>
                    <Typography variant="h6">5</Typography>
                    <Typography variant="body2">to be rejected</Typography>
                    <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                      5 / 0
                    </Typography>
                    <Tooltip
                      className="max-w-52"
                      placement="bottom-start"
                      content="Ratio of correctly refused to incorrectly refused"
                    >
                      <Iconify width={14} icon="eva:question-mark-circle-outline" />
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ mt: '37px' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    How it works
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Start Predicting
                </Typography>

                <Box sx={{ mt: 9, mb: 4 }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {/* <input type="hidden" name='_csrf' /> */}
                    <Button
                      component="label"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{ fontSize: 16, maxWidth: 200 }}
                    >
                      Upload Data
                      <Input type="file" onChange={onUploadFile} sx={{ display: 'none' }} />
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                      or drag and drop a file
                      <br />
                      xlsx or tab-delimited csv only
                    </Typography>
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ color: 'text.secondary', mt: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography>
              credits_data_gm.xlsx by mmnhat666@gmail.com , 18 October 2024 05:10:20
            </Typography>
            <Typography sx={{ ml: 4 }}>Time taken 8.57 s.</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: 400,
              mt: 1,
              '& p': {
                lineHeight: 1,
              },
            }}
          >
            <Box sx={{ fontStyle: 'italic' }}>
              <Typography>Scheduled</Typography>
              <Typography>Train in progress</Typography>
            </Box>
            <Box>
              <Typography>0.625 s.</Typography>
              <Typography>7.427 s.</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4">Calculation history</Typography>
        </Box>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="max-w-6xl"
          scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <ModalBody className="p-8">
                <Typography variant="h4">credits_data_gm</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography>
                    credits_data_gm.xlsx by mmnhat666@gmail.com , 18 October 2024 05:10:20
                  </Typography>
                  <Typography sx={{ ml: 4 }}>Time taken 8.57 s.</Typography>
                </Box>
                <Button variant="contained" size="large" sx={{ width: 300 }}>
                  Download evaluation report
                </Button>

                <Card sx={{ bgcolor: 'background.neutral', mt: 4 }}>
                  <CardContent sx={{ '& p': { color: 'text.secondary' } }}>
                    <Box sx={{ p: 2, pb: 3 }}>
                      <Typography variant="h5">Model overview</Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box>
                          <Typography variant="h6">1000</Typography>
                          <Typography variant="body2">Total records count</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">25 columns</Typography>
                          <Typography variant="body2">Target column: ok</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">300</Typography>
                          <Typography variant="body2">Test records count</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">91.0%</Typography>
                          <Typography variant="body2">Marked as good</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">9.0%</Typography>
                          <Typography variant="body2">Mark as bad</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6">9.00%</Typography>
                          <Typography variant="body2">NLP by source data</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <CircularProgress
                        aria-label="score"
                        size="lg"
                        value={70}
                        color="primary"
                        valueLabel={
                          <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                            <Typography component="span" sx={{ fontSize: '2rem' }}>
                              0.70
                            </Typography>
                            <Typography variant="body2">Score Index</Typography>
                          </Box>
                        }
                        showValueLabel
                        classNames={{
                          svg: 'w-36 h-36 stroke-1',
                          value: 'text-3xl font-semibold',
                        }}
                      />
                      <CircularProgress
                        aria-label="roc aug"
                        size="lg"
                        value={85}
                        color="primary"
                        valueLabel={
                          <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                            <Typography component="span" sx={{ fontSize: '2rem' }}>
                              0.85
                            </Typography>
                            <Typography variant="body2">ROC AUG</Typography>
                          </Box>
                        }
                        showValueLabel
                        classNames={{
                          svg: 'w-36 h-36 stroke-1',
                          value: 'text-3xl font-semibold',
                        }}
                      />
                      <CircularProgress
                        aria-label="k-s score"
                        size="lg"
                        value={58}
                        color="primary"
                        valueLabel={
                          <Box sx={{ textAlign: 'center', '& span, & p': { lineHeight: 1 } }}>
                            <Typography component="span" sx={{ fontSize: '2rem' }}>
                              0.58
                            </Typography>
                            <Typography variant="body2">K-S Score</Typography>
                          </Box>
                        }
                        showValueLabel
                        classNames={{
                          svg: 'w-36 h-36 stroke-1',
                          value: 'text-3xl font-semibold',
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>

                <Box>
                  <Box>
                    <Typography variant="h5">Dataset statistics</Typography>

                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ mt: 8 }}>
                        <Typography sx={{ fontSize: '32px', fontWeight: 700 }}>
                          Density distribution by classes
                        </Typography>

                        <ChartLegends
                          labels={chartOptions?.labels}
                          colors={chartOptions?.colors}
                          sx={{ py: 3 }}
                        />
                      </Box>

                      <Chart
                        type="line"
                        series={chart.series}
                        options={chartOptions}
                        width={760}
                        height={400}
                        sx={{
                          py: 2.5,
                          pl: 1,
                          pr: 2.5,
                          '& svg, & foreignObject': {
                            overflow: 'visible',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      </DashboardContent>
    </>
  );
}
