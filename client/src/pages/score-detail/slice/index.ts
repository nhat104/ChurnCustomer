import type { PayloadAction } from '@reduxjs/toolkit';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { createSlice } from '@reduxjs/toolkit';

import type { ScoreHistoryUpdate, ScoreResultResponse, ScoreResultState } from './types';

export const initialState: ScoreResultState = {
  loading: false,
  dataScoreResult: undefined,
  dataScoreHistory: undefined,
  deleteScoreHistoryStatus: false,
  error: false,

  editNameMode: false,
};

const slice = createSlice({
  name: 'scoreResult',
  initialState,
  reducers: {
    setEditNameMode(state, action: PayloadAction<boolean>) {
      state.editNameMode = action.payload;
    },

    scoreResultRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = false;
    },
    scoreResultSuccess(state, action: PayloadAction<ScoreHistoryResponse>) {
      state.loading = false;
      state.dataScoreHistory = action.payload;
    },
    scoreResultError(state) {
      state.loading = false;
      state.error = true;
    },

    scoreWithInterpretationRequest(state, action: PayloadAction<string | number>) {
      state.loading = true;
      state.error = false;
    },
    scoreWithInterpretationSuccess(state, action: PayloadAction<ScoreResultResponse>) {
      state.loading = false;
      state.dataScoreResult = action.payload;
    },
    scoreWithInterpretationError(state) {
      state.loading = false;
      state.error = true;
    },

    updateScoreHistoryRequest(
      state,
      action: PayloadAction<{ id: number; body: ScoreHistoryUpdate }>
    ) {
      state.loading = true;
      state.error = false;
    },
    updateScoreHistorySuccess(state, action: PayloadAction<ScoreHistoryResponse>) {
      state.loading = false;
      state.dataScoreHistory = action.payload;
      state.editNameMode = false;
    },
    updateScoreHistoryError(state) {
      state.loading = false;
      state.error = true;
    },

    deleteScoreHistoryRequest(state, action: PayloadAction<number | string>) {
      state.loading = true;
      state.error = false;
    },
    deleteScoreHistorySuccess(state) {
      state.loading = false;
      state.deleteScoreHistoryStatus = true;
    },
    deleteScoreHistoryError(state) {
      state.loading = false;
      state.error = true;
    },

    resetScoreHistory(state) {
      state.dataScoreHistory = undefined;
      state.deleteScoreHistoryStatus = false;
    },
  },
});

export const { actions: scoreResultActions } = slice;

export default slice.reducer;
