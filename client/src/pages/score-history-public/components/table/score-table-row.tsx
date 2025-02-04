import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { useCallback } from 'react';

import { Avatar, TableRow, TableCell, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ScoreTableRowProps = {
  row: ScoreHistoryResponse;
};

export function ScoreTableRow({ row }: ScoreTableRowProps) {
  const router = useRouter();

  const handleDetailScore = useCallback(() => {
    router.push(`/scores/${row.id}`);
  }, [router, row.id]);

  return (
    <TableRow hover sx={{ cursor: 'pointer' }} onClick={handleDetailScore}>
      <TableCell>{row.name}</TableCell>

      <TableCell>
        {(row.number_stay ?? 0) + (row.number_exit ?? 0)} records
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {row.number_stay} stay | {row.number_exit} churn
        </Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Avatar
          alt={row.name}
          sx={{ bgcolor: 'primary.light', width: 46, height: 46, fontSize: 16 }}
        >
          {row?.ml_model?.predictive_power}
        </Avatar>
      </TableCell>

      <TableCell>
        {row?.ml_model?.name}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cutoff selection {row?.ml_model?.cutoff_selection}
        </Typography>
      </TableCell>

      <TableCell align="center">
        {row.status === 'Finished' ? (
          <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
        ) : (
          '-'
        )}
      </TableCell>

      <TableCell>{fDateTime(row.created_at)}</TableCell>
    </TableRow>
  );
}
