import type { PayloadAction } from '@reduxjs/toolkit';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { createSlice } from '@reduxjs/toolkit';

import type { ModelDetail, ModelState, ModelUpdate, ScoresByModelRequest } from './types';

export const initialState: ModelState = {
  loading: false,
  dataModel: undefined,
  scoresByModel: [],
  deleteModelStatus: false,
  error: false,

  editNameMode: false,
};

const slice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setEditNameMode(state, action: PayloadAction<boolean>) {
      state.editNameMode = action.payload;
    },

    modelRequest(state, action: PayloadAction<number | string>) {
      state.loading = true;
      state.error = false;
    },
    modelSuccess(state, action: PayloadAction<ModelDetail>) {
      state.loading = false;
      state.dataModel = action.payload;
    },
    modelError(state) {
      state.loading = false;
      state.error = true;
    },

    updateModelRequest(state, action: PayloadAction<{ id: number; body: ModelUpdate }>) {
      state.loading = true;
      state.error = false;
    },
    updateModelSuccess(state, action: PayloadAction<ModelDetail>) {
      state.loading = false;
      state.dataModel = action.payload;
      state.editNameMode = false;
    },
    updateModelError(state) {
      state.loading = false;
      state.error = true;
    },

    deleteModelRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = false;
    },
    deleteModelSuccess(state) {
      state.loading = false;
      state.deleteModelStatus = true;
    },
    deleteModelError(state) {
      state.loading = false;
      state.error = true;
    },

    scoresByModelRequest(state, action: PayloadAction<ScoresByModelRequest>) {
      state.loading = true;
      state.error = false;
    },
    scoreByModelSuccess(state, action: PayloadAction<ScoreHistoryResponse[]>) {
      state.loading = false;
      state.scoresByModel = action.payload;
    },
    scoreByModelError(state) {
      state.loading = false;
      state.error = true;
    },

    resetModel(state) {
      state.loading = false;
      state.dataModel = undefined;
      state.deleteModelStatus = false;
      state.error = false;
      state.scoresByModel = [];
    },
  },
});

export const { actions: modelActions } = slice;

export default slice.reducer;
