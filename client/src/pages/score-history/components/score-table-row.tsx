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

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ModelProps = {
  id: string;
  name: string;
  noRecord: number;
  noApprove: number;
  noDecline: number;
  status: string;
  cutoffSelection: number;
  index: string;
  finished: boolean;
  createdAt: string;
};

type ScoreTableRowProps = {
  row: ModelProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ScoreTableRow({ row, selected, onSelectRow }: ScoreTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>
          {row.noRecord} records
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            3 approve | 2 decline
          </Typography>
        </TableCell>

        <TableCell component="th" scope="row">
          <Avatar
            alt={row.name}
            sx={{ bgcolor: 'primary.light', width: 46, height: 46, fontSize: 16 }}
          >
            {row.index}
          </Avatar>
        </TableCell>

        <TableCell>
          {row.name}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cutoff selection 0.5
          </Typography>
        </TableCell>

        <TableCell align="center">
          {row.finished ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>{row.createdAt}</TableCell>

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
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="fluent:predictions-20-filled" />
            Start Predicting
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
