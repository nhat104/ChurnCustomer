import { useState } from 'react';

import { TableCell, TableRow } from '@mui/material';

import { FeatureImportant } from '../feature-important';

import type { ScoreResultResponse } from '../../slice/types';

// ----------------------------------------------------------------------

type ScoreTableRowProps = {
  index: number;
  row: ScoreResultResponse;
};

export function ScoreTableRow({ index, row }: ScoreTableRowProps) {
  const [openModal, setOpenModal] = useState<number>();

  const handleOpenDetailScore = () => {
    setOpenModal(row.id);
  };

  const handleCloseModal = () => {
    setOpenModal(undefined);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" onClick={handleOpenDetailScore}>
        <TableCell>{index + 1}</TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.score}</TableCell>

        <TableCell
          component="th"
          scope="row"
          sx={{ p: 0, '& div': { width: 120 * (row.score ?? 0) } }}
        >
          {/* <Progress
            size="sm"
            radius="sm"
            aria-label="cutoff"
            classNames={{
              // base: 'max-w-md',
              // track: 'drop-shadow-md border border-default',
              indicator: 'bg-gradient-to-r from-blue-300 to-blue-600',
            }}
            value={(row.score ?? 0) * 100}
          /> */}
          <div className="h-1 bg-gradient-to-r from-blue-300 to-blue-600 rounded-md" />
        </TableCell>

        <TableCell sx={{ pl: 8 }}>{row.resolution}</TableCell>
      </TableRow>

      <FeatureImportant
        open={openModal === row.id}
        rowId={index + 1}
        scoreResultId={row.id}
        handleClose={handleCloseModal}
      />
    </>
  );
}
