import type { PayloadAction } from '@reduxjs/toolkit';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { createSlice } from '@reduxjs/toolkit';

import type { ModelDetail, ModelState, ModelUpdate, ScoresByModelRequest } from './types';

export const initialState: ModelState = {
  loading: false,
  dataModel: undefined,
  deleteModelStatus: false,
  error: false,

  loadingScores: false,
  scoresByModel: [],
  errorScores: false,

  loadingUpdate: false,
  errorUpdate: false,

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

    rebuildModelRequest(state, action: PayloadAction<[number, number]>) {
      state.loading = true;
      state.error = false;
    },
    rebuildModelSuccess(state, action: PayloadAction<ModelDetail>) {
      state.loading = false;
      state.dataModel = action.payload;
    },
    rebuildModelError(state) {
      state.loading = false;
      state.error = true;
    },

    updateModelRequest(state, action: PayloadAction<{ id: number; body: ModelUpdate }>) {
      state.loadingUpdate = true;
      state.errorUpdate = false;
    },
    updateModelSuccess(state, action: PayloadAction<ModelDetail>) {
      state.loadingUpdate = false;
      state.dataModel = { ...state.dataModel, ...action.payload };
      state.editNameMode = false;
    },
    updateModelError(state) {
      state.loadingUpdate = false;
      state.errorUpdate = true;
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
      state.loadingScores = true;
      state.errorScores = false;
    },
    scoreByModelSuccess(state, action: PayloadAction<ScoreHistoryResponse[]>) {
      state.loadingScores = false;
      state.scoresByModel = action.payload;
    },
    scoreByModelError(state) {
      state.loadingScores = false;
      state.errorScores = true;
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
