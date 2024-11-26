import type { IconButtonProps } from '@mui/material';

import { useCallback, useState } from 'react';

import { IconButton, MenuItem, menuItemClasses, MenuList, Popover } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type MoreActionProps = IconButtonProps & {
  options: {
    icon: string;
    value: string;
    label: string;
    onClick?: VoidFunction;
  }[];
};

export default function MoreAction({ options, sx, ...other }: MoreActionProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpenPopover} sx={sx} {...other}>
        <Iconify icon="eva:more-horizontal-fill" />
      </IconButton>

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
            color: 'text.secondary',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                option.onClick?.();
                handleClosePopover();
              }}
            >
              <Iconify icon={option.icon} />
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
