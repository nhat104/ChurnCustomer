import { Helmet } from 'react-helmet-async';
import { useCallback, useState } from 'react';

import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';

import { _scoreHistory } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';
import { TableEmptyRows, TableNoData } from 'src/components/table';

import PredictBox from './components/predict-box';
import MoreAction from './components/more-action';
import CutoffBox from './components/cutoff-selection/cutoff-box';
import StatisticBox from './components/statistic-model/statistic-box';
import {
  applyFilter,
  emptyRows,
  getComparator,
  ScoreTableHead,
  ScoreTableRow,
  ScoreTableToolbar,
} from './components/table';

import type { PredictProps } from './components/table/score-table-row';

// ----------------------------------------------------------------------

export default function ModelDetail() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: PredictProps[] = applyFilter({
    inputData: _scoreHistory,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {`Scoring model - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <DashboardContent>
        <Typography variant="h4">credits_data_gm</Typography>

        <Box display="flex" justifyContent="flex-end" sx={{ mt: 3, mb: 1 }}>
          <MoreAction
            options={[
              { icon: 'solar:map-arrow-right-outline', value: 'export', label: 'Export' },
              { icon: 'solar:trash-bin-trash-bold', value: 'delete', label: 'Delete' },
              { icon: 'solar:star-outline', value: 'addFavorite', label: 'Add to favorite' },
              { icon: 'solar:pen-bold', value: 'editName', label: 'Edit name' },
              {
                icon: 'solar:download-minimalistic-outline',
                value: 'download',
                label: 'Download report',
              },
            ]}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StatisticBox />
          </Grid>

          <Grid item xs={6} md={3}>
            <CutoffBox />
          </Grid>

          <Grid item xs={6} md={3}>
            <PredictBox />
          </Grid>
        </Grid>

        <Box sx={{ color: 'text.secondary', mt: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography>
              credits_data_gm.xlsx by mmnhat666@gmail.com , 18 October 2024 05:10:20
            </Typography>
            <Typography sx={{ ml: 4 }}>Time taken 8.57 s.</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: 400,
              mt: 1,
              '& p': {
                lineHeight: 1,
              },
            }}
          >
            <Box sx={{ fontStyle: 'italic' }}>
              <Typography>Scheduled</Typography>
              <Typography>Train in progress</Typography>
            </Box>
            <Box>
              <Typography>0.625 s.</Typography>
              <Typography>7.427 s.</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, mb: 2 }}>
          <Typography variant="h4">Calculation history</Typography>
        </Box>

        <Card>
          <ScoreTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ScoreTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={_scoreHistory.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      _scoreHistory.map((user) => user.id)
                    )
                  }
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'quantity', label: 'Quantity' },
                    { id: 'index', label: 'Index' },
                    { id: 'model', label: 'Model' },
                    { id: 'finished', label: 'Finished', align: 'center' },
                    { id: 'createdAt', label: 'Created At' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ScoreTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, _scoreHistory.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={_scoreHistory.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>
    </>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('createdAt');
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
