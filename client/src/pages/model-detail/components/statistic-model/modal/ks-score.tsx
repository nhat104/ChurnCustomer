import type { ChartOptions } from 'src/components/chart';
import type { KSScoreAttribute } from 'src/pages/model-detail/slice/types';

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
    ksScoreAttr?: KSScoreAttribute;
  };
};

export function KSScore({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark, alpha(theme.palette.primary.light, 0.3)];

  const chartOptions = useChart({
    annotations: {
      xaxis: [
        {
          x: chart.ksScoreAttr?.ks_threshold,
          strokeDashArray: 5,
          label: {
            text: `K-S Score: ${chart.ksScoreAttr?.ks_statistic} at ${((chart.ksScoreAttr?.ks_threshold ?? 0) / 10).toFixed(2)}`,
            textAnchor: 'start',
            orientation: 'horizontal',
            offsetX: 20,
            offsetY: 100,
            style: {
              fontSize: '14px',
              color: theme.palette.text.primary,
              background: 'transparent',
              padding: {
                left: 10,
                top: 5,
              },
            },
          },
        },
      ],
      points: [
        {
          x: chart.ksScoreAttr?.ks_threshold,
          y: chart.ksScoreAttr?.point_positive,
          marker: {
            size: 2,
            fillColor: theme.palette.common.white,
            strokeColor: '#f8c630',
            strokeWidth: 2,
          },
        },
        {
          x: chart.ksScoreAttr?.ks_threshold,
          y: chart.ksScoreAttr?.point_negative,
          marker: {
            size: 2,
            fillColor: theme.palette.common.white,
            strokeColor: '#f8c630',
            strokeWidth: 2,
          },
        },
      ],
    },
    colors: chartColors,
    stroke: {
      width: 2,
    },
    grid: { show: false },
    xaxis: {
      type: 'numeric',
      tickAmount: 4,
      max: 10.0,
      axisBorder: { show: true },
      axisTicks: { show: true },
      labels: { show: true, formatter: (value) => `${(Number(value) / 10).toFixed(2)}` },
      title: { text: 'Prediction result', style: { fontSize: '14px', fontWeight: 400 } },
    },
    yaxis: {
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: {
        text: 'Cumulative Probability Function',
        style: { fontSize: '14px', fontWeight: 400 },
      },
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
