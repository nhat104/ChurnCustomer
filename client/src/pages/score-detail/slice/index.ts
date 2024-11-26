import type { PayloadAction } from '@reduxjs/toolkit';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { createSlice } from '@reduxjs/toolkit';

import type { ScoreResultState } from './types';

export const initialState: ScoreResultState = {
  loading: false,
  dataScoreHistory: undefined,
  error: false,
};

const slice = createSlice({
  name: 'scoreResult',
  initialState,
  reducers: {
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
  },
});

export const { actions: scoreResultActions } = slice;

export default slice.reducer;
