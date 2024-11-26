import { useState, useCallback } from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import {
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuList,
  TableCell,
  Typography,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import type { ScoreHistoryResponse } from '../../slice/types';

// ----------------------------------------------------------------------

type ScoreTableRowProps = {
  row: ScoreHistoryResponse;
  selected: boolean;
  onSelectRow: () => void;
};

export function ScoreTableRow({ row, selected, onSelectRow }: ScoreTableRowProps) {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDetailScore = useCallback(() => {
    router.push(`/scoring/${row.id}`);
  }, [router, row.id]);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>
          {(row.number_approve ?? 0) + (row.number_decline ?? 0)} records
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.number_approve} approve | {row.number_decline} decline
          </Typography>
        </TableCell>

        <TableCell component="th" scope="row">
          <Avatar
            alt={row.name}
            sx={{ bgcolor: 'primary.light', width: 46, height: 46, fontSize: 16 }}
          >
            {row.ml_model.predictive_power}
          </Avatar>
        </TableCell>

        <TableCell>
          {row.ml_model.name}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cutoff selection {row.ml_model.cutoff_selection}
          </Typography>
        </TableCell>

        <TableCell align="center">
          {row.status === 'Finished' ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>{row.created_at}</TableCell>

        {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleDetailScore}>
            <Iconify icon="akar-icons:statistic-up" />
            Show
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
