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

import { DeleteModel } from '../modal/delete-model';

import type { ModelResponse } from '../../slice/types';

// ----------------------------------------------------------------------

type ModelTableRowProps = {
  row: ModelResponse;
  selected: boolean;
  onSelectRow: () => void;
};

export function ModelTableRow({ row, selected, onSelectRow }: ModelTableRowProps) {
  const [openModal, setOpenModal] = useState<number>();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDetailModel = useCallback(() => {
    router.push(`/model/${row.id}`);
  }, [router, row.id]);

  const handleOpenDeleteModal = useCallback(
    (id: number) => {
      setOpenModal(id);
      setOpenPopover(null);
    },
    [setOpenPopover]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(undefined);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Avatar
            alt={row.name}
            sx={{ bgcolor: 'primary.light', width: 46, height: 46, fontSize: 16 }}
          >
            {row.predictive_power}
          </Avatar>
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell align="center">
          {row.cutoff_selection}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.last_score_time ? `Last scoring ${row.last_score_time}` : ''}
          </Typography>
        </TableCell>

        <TableCell align="center">{row.calculation}</TableCell>

        <TableCell align="center">
          {row.status === 'Finished' ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>{row.created_at}</TableCell>

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
          <MenuItem onClick={handleDetailModel}>
            <Iconify icon="fluent:predictions-20-filled" />
            Start Predicting
          </MenuItem>

          <MenuItem onClick={() => handleOpenDeleteModal(row.id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <DeleteModel open={openModal === row.id} modelId={row.id} handleClose={handleCloseModal} />
    </>
  );
}
