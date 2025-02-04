import type { ModelResponse } from 'src/pages/models/slice/types';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden, type TableHeadLabel } from 'src/components/table';

// ----------------------------------------------------------------------

type ScoreTableHeadProps = {
  orderBy: string;
  rowCount: number;
  order: 'asc' | 'desc';
  onSort: (id: keyof ScoreHistoryResponse) => void;
  headLabel: TableHeadLabel<ScoreHistoryResponse, ModelResponse>[];
};

export function ScoreTableHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headLabel,
}: ScoreTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id as keyof ScoreHistoryResponse)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
