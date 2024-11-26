import { Helmet } from 'react-helmet-async';
import { useState, useEffect, type ChangeEvent } from 'react';

import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Input,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Loading } from 'src/components/loading';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  applyFilter,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableNoData,
  useTable,
} from 'src/components/table';

import { modelsActions } from './slice';
import { selectModels } from './slice/selectors';
import { modelActions } from '../model-detail/slice';
import { dashboardActions } from '../dashboard/slice';
import { selectModel } from '../model-detail/slice/selectors';
import { selectDashboard } from '../dashboard/slice/selectors';
import { ModelTableRow } from './components/table/model-table-row';
import { ModelTableHead } from './components/table/model-table-head';
import { ModelTableToolbar } from './components/table/model-table-toolbar';

import type { ModelResponse } from './slice/types';

// ----------------------------------------------------------------------

export default function Model() {
  const [filterName, setFilterName] = useState('');

  const router = useRouter();
  const { loading, dataModels } = useAppSelector(selectModels);
  const { loading: uploadLoading, uploadData } = useAppSelector(selectDashboard);
  const { loading: modelLoading, deleteModelStatus } = useAppSelector(selectModel);
  const dispatch = useAppDispatch();

  const table = useTable<ModelResponse>({ _orderBy: 'created_at' });

  const dataFiltered = applyFilter({
    inputData: dataModels ?? [],
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  useEffect(() => {
    dispatch(modelsActions.modelsRequest({ offset: 0, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (uploadData) {
      router.push(`/model/${uploadData.id}`);
      dispatch(dashboardActions.resetDashboard());
    }
  }, [dispatch, router, uploadData]);

  useEffect(() => {
    if (deleteModelStatus) {
      dispatch(modelActions.resetModel());
      dispatch(modelsActions.modelsRequest({ offset: 0, limit: 10 }));
    }
  }, [dispatch, deleteModelStatus]);

  const notFound = !dataFiltered.length && !!filterName;

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileData = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (fileData) {
      formData.append('data_file', fileData);
      dispatch(dashboardActions.uploadDataRequest(formData));
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Model history - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Scoring models
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Import model
            <Input
              type="file"
              inputProps={{
                accept:
                  'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              }}
              onChange={onUploadFile}
              sx={{ display: 'none' }}
            />
          </Button>
        </Box>

        {(loading || modelLoading || uploadLoading) && <Loading />}

        {dataModels && (
          <Card>
            <ModelTableToolbar
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
                  <ModelTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={dataModels?.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        dataModels.map((model) => model?.id)
                      )
                    }
                    headLabel={[
                      { id: 'predictive_power', label: 'Power' },
                      { id: 'name', label: 'Name' },
                      { id: 'cutoff_selection', label: 'Cutoff Selection', align: 'center' },
                      { id: 'calculation', label: 'Calculations', align: 'center' },
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
                        <ModelTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                        />
                      ))}

                    <TableEmptyRows
                      height={78}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataModels.length)}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              page={table.page}
              count={dataModels.length}
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
