import type { ChartOptions } from 'src/components/chart';

import { useTheme } from '@mui/material/styles';
import { alpha, Box, type BoxProps, Typography } from '@mui/material';

import { Chart, ChartLegends, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      name: string;
      data: number[][];
    }[];
    options?: ChartOptions;
  };
};

export function DensityDistribution({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark, alpha(theme.palette.primary.light, 0.3)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
    },
    grid: { show: false },
    xaxis: {
      type: 'numeric',
      tickAmount: 5,
      axisBorder: { show: true },
      axisTicks: { show: true },
      labels: { show: true, formatter: (value) => `${Number(value) / 10}` },
      title: { text: 'Score', style: { fontSize: '14px', fontWeight: 400 } },
    },
    yaxis: {
      stepSize: 2,
      tickAmount: 6,
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: { text: 'Density', style: { fontSize: '14px', fontWeight: 400 } },
    },
    tooltip: {
      shared: true,
      followCursor: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
  });

  return (
    <Box {...other} sx={{ display: 'flex', justifyContent: 'space-between', ...other.sx }}>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: '32px', fontWeight: 700 }}>{title}</Typography>

        <ChartLegends
          labels={chart.series.map((i) => i.name)}
          colors={chartOptions?.colors}
          sx={{ py: 3 }}
        />
      </Box>

      <Chart type="line" series={chart.series} options={chartOptions} width={760} height={400} />
    </Box>
  );
}
