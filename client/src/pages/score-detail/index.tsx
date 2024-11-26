import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Divider, useDisclosure } from '@nextui-org/react';
import { type MouseEvent, useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
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

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Loading } from 'src/components/loading';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableEmptyRows, useTable } from 'src/components/table';

import { scoreResultActions } from './slice';
import MoreAction from './components/more-action';
import { selectScoreResult } from './slice/selectors';
import { FeatureImportant } from './components/feature-important';
import {
  applyFilter,
  emptyRows,
  getComparator,
  ScoreTableHead,
  ScoreTableRow,
} from './components/table';

import type { ScoreResultResponse } from './slice/types';

// ----------------------------------------------------------------------

export default function ScoreDetail() {
  const table = useTable<ScoreResultResponse>({ _orderBy: 'score', _order: 'asc' });
  const router = useRouter();
  const { scoreId } = useParams();
  const [openPopover, setOpenPopover] = useState<HTMLDivElement | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { loading, dataScoreHistory } = useAppSelector(selectScoreResult);
  const dispatch = useAppDispatch();

  const handleBackRoute = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (scoreId) {
      dispatch(scoreResultActions.scoreResultRequest(scoreId));
    }
  }, [dispatch, scoreId]);

  const handleDetailModel = () => {
    router.push(`/model/${dataScoreHistory?.ml_model.id}`);
  };

  const handleOpenPopover = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const dataFiltered: ScoreResultResponse[] = applyFilter({
    inputData: dataScoreHistory?.score_results ?? [],
    comparator: getComparator(table.order, table.orderBy),
  });

  return (
    <>
      <Helmet>
        <title> {`Scoring calculation - ${CONFIG.appName}`}</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      {dataScoreHistory ? (
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
                {dataScoreHistory.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', mt: 1, mb: 2 }}>
                Scoring calculation ID {dataScoreHistory?.id}
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
                  <Typography variant="body1">
                    {(dataScoreHistory.number_approve ?? 0) +
                      (dataScoreHistory.number_decline ?? 0)}{' '}
                    records
                  </Typography>
                  <Typography variant="body2">
                    {dataScoreHistory.number_approve} approve | {dataScoreHistory.number_decline}{' '}
                    decline
                  </Typography>
                </Box>
                <Box onClick={handleDetailModel} sx={{ cursor: 'pointer' }}>
                  <Typography variant="body1">{dataScoreHistory.ml_model.name}</Typography>
                  <Typography variant="body2">
                    Cutoff selection {dataScoreHistory.ml_model.cutoff_selection}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">File</Typography>
                  <Typography variant="body2">credits_data_gm.xlsx</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">mmnhat666@gmail.com</Typography>
                  <Typography variant="body2">
                    {dataScoreHistory.ml_model.created_at}
                    <span className="ml-4">Time taken 1.53 s.</span>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body1">Download</Typography>
                  <Box
                    onClick={handleOpenPopover}
                    sx={{
                      position: 'relative',
                      top: -1,
                      color: 'text.secondary',
                      cursor: 'pointer',
                    }}
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
                      { id: 'row', label: 'Row' },
                      { id: 'score', label: 'Score' },
                      { id: '', width: 120 },
                      { id: 'decision', label: 'Quantity' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row, index) => (
                        <ScoreTableRow index={index} onOpen={onOpen} key={row.id} row={row} />
                      ))}

                    <TableEmptyRows
                      height={54}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        dataScoreHistory.score_results.length
                      )}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              page={table.page}
              count={dataScoreHistory.score_results.length}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Box>
        </DashboardContent>
      ) : (
        loading && <Loading />
      )}

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
