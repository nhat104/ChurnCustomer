import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import {
  Box,
  Card,
  Table,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Loading } from 'src/components/loading';
import { Scrollbar } from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableNoData,
  emptyRows,
  applyFilter,
  getComparator,
  useTable,
} from 'src/components/table';

import { scoreHistoryActionss } from './slice';
import { selectScoreHistory } from './slice/selectors';
import { scoreResultActions } from '../score-detail/slice';
import { ScoreTableRow } from './components/table/score-table-row';
import { selectScoreResult } from '../score-detail/slice/selectors';
import { ScoreTableHead } from './components/table/score-table-head';
import { ScoreTableToolbar } from './components/table/score-table-toolbar';

import type { ScoreHistoryResponse } from './slice/types';

// ----------------------------------------------------------------------

export default function ScoreHistory() {
  const table = useTable<ScoreHistoryResponse>({ _orderBy: 'created_at' });
  const [filterName, setFilterName] = useState('');

  const { loading, dataScoreHistories } = useAppSelector(selectScoreHistory);
  const { loading: loadingScoreResult, deleteScoreHistoryStatus } =
    useAppSelector(selectScoreResult);
  const dispatch = useAppDispatch();

  const dataFiltered = applyFilter({
    inputData: dataScoreHistories ?? [],
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  useEffect(() => {
    dispatch(scoreHistoryActionss.scoreHistoriesRequest({ offset: 0, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (deleteScoreHistoryStatus) {
      // unchecked all selected rows
      table.onSelectAllRows(false, []);
      dispatch(scoreResultActions.resetScoreHistory());
      dispatch(scoreHistoryActionss.scoreHistoriesRequest({ offset: 0, limit: 100 }));
    }
  }, [dispatch, deleteScoreHistoryStatus, table]);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {`Calculation history - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box mb={5}>
          <Typography variant="h4">Predicting history</Typography>
        </Box>

        {(loading || loadingScoreResult) && <Loading />}
        {dataScoreHistories && (
          <Card>
            <ScoreTableToolbar
              selected={table.selected}
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
                    rowCount={dataScoreHistories.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        dataScoreHistories.map((user) => user.id)
                      )
                    }
                    headLabel={[
                      { id: 'name', label: 'Name' },
                      { id: 'number_stay', label: 'Quantity' },
                      { id: 'predictive_power', label: 'Power' },
                      { id: 'ml_model', label: 'Model' },
                      { id: 'status', label: 'Finished', align: 'center' },
                      { id: 'created_at', label: 'Created At' },
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
                      height={78}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        dataScoreHistories.length
                      )}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              page={table.page}
              count={dataScoreHistories.length}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        )}
      </DashboardContent>
    </>
  );
}
