import type { TableHeadLabel } from 'src/components/table';

import { Box, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';

import { visuallyHidden } from './utils';

import type { ScoreResultResponse } from '../../slice/types';

// ----------------------------------------------------------------------

type ScoreTableHeadProps = {
  orderBy: string;
  order: 'asc' | 'desc';
  headLabel: TableHeadLabel<ScoreResultResponse>[];
  rows?: number;
  cutoffValue?: number;
};

export function ScoreTableHead({
  order,
  orderBy,
  headLabel,
  rows,
  cutoffValue,
}: ScoreTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              position: headCell.id === '' ? 'relative' : 'static',
              pl: headCell.id === 'resolution' ? 8 : 0,
            }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              sx={{ cursor: 'default' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>

            {headCell.id === '' ? (
              <Box
                sx={{
                  position: 'absolute',
                  left: `${(cutoffValue ?? 0) * 100}%`,
                  top: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                  width: '70px',
                }}
              >
                <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                  Cutoff {cutoffValue}
                </Typography>
                <Box
                  sx={{
                    height: (rows ?? 5) * 54 - 28,
                    width: 1,
                    backgroundImage: 'linear-gradient(grey 50%, rgba(255,255,255,0) 0%)',
                    backgroundPosition: 'left',
                    backgroundSize: '1px 10px',
                    backgroundRepeat: 'repeat-y',
                  }}
                />
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
