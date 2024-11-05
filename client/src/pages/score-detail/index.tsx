import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { type MouseEvent, useCallback, useState } from 'react';

import { Divider, useDisclosure } from '@nextui-org/react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  menuItemClasses,
  MenuList,
  Popover,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { _predicts } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableEmptyRows, TableNoData } from 'src/components/table';

import MoreAction from './components/more-action';
import {
  applyFilter,
  emptyRows,
  getComparator,
  ScoreTableHead,
  ScoreTableRow,
  ScoreTableToolbar,
} from './components/table';

import type { PredictProps } from './components/table/score-table-row';
import { FeatureImportant } from './components/feature-important';

// ----------------------------------------------------------------------

export default function ScoreDetail() {
  const table = useTable();
  const router = useRouter();
  const { scoreId } = useParams();
  const score = _predicts.find((item) => item.id === scoreId);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openPopover, setOpenPopover] = useState<HTMLDivElement | null>(null);

  const handleBackRoute = useCallback(() => {
    router.back();
  }, [router]);

  const handleDetailModel = useCallback(() => {
    // router.push(`/models/${score?.model}`);
  }, []);

  const handleOpenPopover = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const dataFiltered: PredictProps[] = applyFilter({
    inputData: _predicts,
    comparator: getComparator(table.order, table.orderBy),
  });

  return (
    <>
      <Helmet>
        <title> {`Scoring calculation - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <DashboardContent>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Button
                disableRipple
                color="inherit"
                startIcon={<Iconify icon="solar:alt-arrow-left-outline" />}
                onClick={handleBackRoute}
              >
                Back
              </Button>
              <MoreAction
                options={[
                  { icon: 'solar:star-outline', value: 'addFavorite', label: 'Add to favorite' },
                  { icon: 'solar:pen-bold', value: 'editName', label: 'Edit name' },
                ]}
              />
            </Box>

            <Typography variant="h4" sx={{ mt: 1 }}>
              credits_data_gm
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'primary.main', mt: 1, mb: 2 }}>
              Scoring calculation ID {score?.id}
            </Typography>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                '& p:nth-of-type(1)': { fontWeight: 500 },
                '& p:nth-of-type(2)': { color: 'text.secondary' },
              }}
            >
              <Box>
                <Typography variant="body1">3 records</Typography>
                <Typography variant="body2">3 approve | 0 decline</Typography>
              </Box>
              <Box onClick={handleDetailModel} sx={{ cursor: 'pointer' }}>
                <Typography variant="body1">credits_data_gm</Typography>
                <Typography variant="body2">Cutoff selection 0.5</Typography>
              </Box>
              <Box>
                <Typography variant="body1">File</Typography>
                <Typography variant="body2">credits_data_gm.xlsx</Typography>
              </Box>
              <Box>
                <Typography variant="body1">mmnhat666@gmail.com</Typography>
                <Typography variant="body2">
                  23 October 2024 15:46:45
                  <span className="ml-4">Time taken 1.53 s.</span>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body1">Download</Typography>
                <Box
                  onClick={handleOpenPopover}
                  sx={{ position: 'relative', top: -1, color: 'text.secondary', cursor: 'pointer' }}
                >
                  <Iconify width={18} icon="solar:alt-arrow-down-outline" />
                </Box>

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
                      <MenuItem key={option.value} onClick={handleClosePopover}>
                        <Iconify icon="solar:download-minimalistic-outline" />
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Popover>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4">Result</Typography>
        </Box>

        <Box>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ScoreTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'index', label: 'Index' },
                    { id: '', width: 120 },
                    { id: 'quantity', label: 'Quantity' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ScoreTableRow onOpen={onOpen} key={row.id} row={row} />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, _predicts.length)}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={_predicts.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Box>
      </DashboardContent>

      <FeatureImportant isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

const options = [
  {
    value: 'source',
    label: 'Source data',
  },
  {
    value: 'predict',
    label: 'Prediction data',
  },
  {
    value: 'both',
    label: 'Both data',
  },
];

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('index');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
