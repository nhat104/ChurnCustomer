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
  auc_score: number;
};

export function RocAuc({ title, subheader, chart, auc_score, ...other }: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette.primary.dark, alpha(theme.palette.primary.light, 0.3)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      curve: ['stepline', 'straight'],
      dashArray: [0, 8],
    },
    annotations: {
      texts: [
        {
          x: 650,
          y: 250,
          text: `AUC = ${auc_score}`,
          textAnchor: 'middle',
          backgroundColor: theme.palette.grey[200],
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
          fontSize: 14,
        },
      ],
    },
    grid: { show: false },
    xaxis: {
      type: 'numeric',
      tickAmount: 4,
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: { text: 'False Positive Rate', style: { fontSize: '14px', fontWeight: 400 } },
    },
    yaxis: {
      axisBorder: { show: true },
      axisTicks: { show: true },
      title: { text: 'True Positive Rate', style: { fontSize: '14px', fontWeight: 400 } },
    },
    tooltip: {
      enabled: false,
      enabledOnSeries: [0],
      followCursor: true,
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

      <Chart
        type="line"
        series={[
          ...chart.series,
          {
            data: [
              [0, 0],
              [1, 1],
            ],
          },
        ]}
        options={chartOptions}
        width={760}
        height={400}
      />
    </Box>
  );
}
