import { Progress } from '@nextui-org/react';

import { TableCell, TableRow } from '@mui/material';

// ----------------------------------------------------------------------

export type PredictProps = {
  id: string;
  score: string;
  decision: string;
};

type ScoreTableRowProps = {
  row: PredictProps;
  onOpen: () => void;
};

export function ScoreTableRow({ row, onOpen }: ScoreTableRowProps) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" onClick={onOpen}>
      <TableCell>{row.id}</TableCell>

      <TableCell>{row.score}</TableCell>

      <TableCell component="th" scope="row">
        <Progress
          size="sm"
          radius="sm"
          aria-label="cutoff"
          classNames={{
            // base: 'max-w-md',
            // track: 'drop-shadow-md border border-default',
            indicator: 'bg-gradient-to-r from-blue-300 to-blue-600',
          }}
          value={100}
        />
      </TableCell>

      <TableCell>{row.decision}</TableCell>
    </TableRow>
  );
}
