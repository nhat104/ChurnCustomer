import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { _scoreHistory } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from './components/table-no-data';
import { ScoreTableRow } from './components/score-table-row';
import { ScoreTableHead } from './components/score-table-head';
import { TableEmptyRows } from './components/table-empty-rows';
import { ScoreTableToolbar } from './components/score-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './components/utils';

import type { ModelProps } from './components/score-table-row';
// ----------------------------------------------------------------------

export default function ScoreHistory() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: ModelProps[] = applyFilter({
    inputData: _scoreHistory,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {`Predicting history - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box mb={5}>
          <Typography variant="h4">Predicting history</Typography>
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
