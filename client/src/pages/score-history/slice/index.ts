import type { QueryParams } from 'src/api/type';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { ScoreHistoryResponse, ScoreHistoryState } from './types';

export const initialState: ScoreHistoryState = {
  loading: false,
  dataScoreHistories: undefined,
  error: false,
};

const slice = createSlice({
  name: 'scoreHistory',
  initialState,
  reducers: {
    scoreHistoriesRequest(state, action: PayloadAction<QueryParams>) {
      state.loading = true;
      state.error = false;
    },
    scoreHistoriesSuccess(state, action: PayloadAction<ScoreHistoryResponse[]>) {
      state.loading = false;
      state.dataScoreHistories = action.payload;
    },
    scoreHistoriesError(state) {
      state.loading = false;
      state.error = true;
    },

    scoreHistoryAllUserRequest(state, action: PayloadAction<QueryParams>) {
      state.loading = true;
      state.error = false;
    },
    scoreHistoryAllUserSuccess(state, action: PayloadAction<ScoreHistoryResponse[]>) {
      state.loading = false;
      state.dataScoreHistories = action.payload;
    },
    scoreHistoryAllUserError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: scoreHistoryActionss } = slice;

export default slice.reducer;
