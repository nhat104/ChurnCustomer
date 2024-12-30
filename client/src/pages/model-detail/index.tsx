import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Card,
  Grid,
  OutlinedInput,
  Table,
  TableBody,
  TablePagination,
  Typography,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Loading } from 'src/components/loading';
import { Scrollbar } from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableNoData,
  applyFilter,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';

import { modelActions } from './slice';
import { selectModel } from './slice/selectors';
import PredictBox from './components/predict-box';
import MoreAction from './components/more-action';
import { ModelError } from './components/model-error';
import { dashboardActions } from '../dashboard/slice';
import { scoreResultActions } from '../score-detail/slice';
import { selectDashboard } from '../dashboard/slice/selectors';
import CutoffBox from './components/cutoff-selection/cutoff-box';
import { selectScoreResult } from '../score-detail/slice/selectors';
import StatisticBox from './components/statistic-model/statistic-box';
import { DeleteModel } from '../models/components/modal/delete-model';
import { ScoreTableHead, ScoreTableRow, ScoreTableToolbar } from './components/table';

import type { ScoreHistoryResponse } from '../score-history/slice/types';

// ----------------------------------------------------------------------

export default function ModelDetail() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const { modelId } = useParams<{ modelId: string }>();

  const router = useRouter();
  const table = useTable<ScoreHistoryResponse>({ _orderBy: 'created_at' });

  const { loading, dataModel, scoresByModel, editNameMode, deleteModelStatus } =
    useAppSelector(selectModel);
  const { loading: predictLoading, predictResult } = useAppSelector(selectDashboard);
  const { loading: deleteLoading, deleteScoreHistoryStatus } = useAppSelector(selectScoreResult);
  const dispatch = useAppDispatch();

  const dataFiltered = applyFilter({
    inputData: scoresByModel,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  useEffect(() => {
    if (modelId) {
      // check modelId is number
      if (!Number.isInteger(+modelId)) {
        router.push('/404');
        return;
      }
      dispatch(modelActions.modelRequest(modelId));
      dispatch(modelActions.scoresByModelRequest({ modelId: +modelId, params: {} }));
    }
  }, [dispatch, modelId, router]);

  useEffect(() => {
    if (deleteModelStatus) {
      router.push('/model');
      dispatch(modelActions.resetModel());
    }
  }, [deleteModelStatus, dispatch, router]);

  useEffect(() => {
    if (predictResult) {
      router.push(`/scoring/${predictResult.id}`);
      dispatch(dashboardActions.resetDashboard());
    }
  }, [dispatch, predictResult, router]);

  useEffect(() => {
    if (deleteScoreHistoryStatus) {
      dispatch(modelActions.scoresByModelRequest({ modelId: +modelId!, params: {} }));
      dispatch(scoreResultActions.resetScoreHistory());
    }
  }, [deleteScoreHistoryStatus, dispatch, modelId]);

  const handleOpenDeleteModal = () => {
    setOpenModal(true);
  };

  const handleEditName = () => {
    dispatch(modelActions.setEditNameMode(true));
    setTimeout(() => {
      inputNameRef.current?.focus();
    }, 100);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {`Scoring model - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      {(loading || predictLoading || deleteLoading) && <Loading />}

      {dataModel && dataModel.status === 'Finished' ? (
        <DashboardContent>
          <Box sx={{ height: 56 }}>
            {editNameMode ? (
              <OutlinedInput
                defaultValue={dataModel.name}
                inputRef={inputNameRef}
                fullWidth
                onBlur={(e) => dispatch(modelActions.setEditNameMode(false))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(
                      modelActions.updateModelRequest({
                        id: +modelId!,
                        body: { name: inputNameRef.current?.value },
                      })
                    );
                  }
                }}
                sx={{ maxWidth: '50%' }}
              />
            ) : (
              <Typography variant="h4">{dataModel.name}</Typography>
            )}
          </Box>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2, mb: 1 }}>
            <MoreAction
              options={[
                { icon: 'solar:map-arrow-right-outline', value: 'export', label: 'Export' },
                {
                  icon: 'solar:trash-bin-trash-bold',
                  value: 'delete',
                  label: 'Delete',
                  onClick: handleOpenDeleteModal,
                },
                { icon: 'solar:star-outline', value: 'addFavorite', label: 'Add to favorite' },
                {
                  icon: 'solar:pen-bold',
                  value: 'editName',
                  label: 'Edit name',
                  onClick: handleEditName,
                },
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
              <CutoffBox _cutoffValue={dataModel.cutoff_selection ?? 0} />
            </Grid>

            <Grid item xs={6} md={3}>
              <PredictBox />
            </Grid>
          </Grid>

          <Box sx={{ color: 'text.secondary', mt: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {dataModel?.filename} by mmnhat666@gmail.com, {fDateTime(dataModel.created_at)}
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
            {scoresByModel.length > 0 ? (
              <>
                <Typography variant="h4">Calculation history</Typography>

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
                    <Table sx={{ minWidth: 800 }}>
                      <ScoreTableHead
                        order={table.order}
                        orderBy={table.orderBy}
                        rowCount={scoresByModel.length}
                        numSelected={table.selected.length}
                        onSort={table.onSort}
                        onSelectAllRows={(checked) =>
                          table.onSelectAllRows(
                            checked,
                            scoresByModel.map((user) => user.id)
                          )
                        }
                        headLabel={[
                          { id: 'name', label: 'Name' },
                          { id: 'number_stay', label: 'Quantity' },
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
                          height={76}
                          emptyRows={emptyRows(table.page, table.rowsPerPage, scoresByModel.length)}
                        />

                        {notFound && <TableNoData searchQuery={filterName} />}
                      </TableBody>
                    </Table>
                  </Scrollbar>

                  <TablePagination
                    component="div"
                    page={table.page}
                    count={scoresByModel.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                  />
                </Card>
              </>
            ) : (
              <Typography sx={{ fontSize: 22, color: 'text.secondary', textAlign: 'center' }}>
                No scoring history, please upload the data
              </Typography>
            )}
          </Box>

          <DeleteModel open={openModal} modelId={+(modelId ?? 0)} handleClose={handleCloseModal} />
        </DashboardContent>
      ) : (
        !loading && (
          <DashboardContent>
            <ModelError />
          </DashboardContent>
        )
      )}
    </>
  );
}
