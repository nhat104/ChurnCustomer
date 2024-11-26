import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { DashboardState } from './types';

export const initialState: DashboardState = {
  loading: false,
  uploadData: undefined,
  predictResult: undefined,
  error: false,
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    uploadDataRequest(state, action: PayloadAction<FormData>) {
      state.loading = true;
      state.error = false;
    },
    uploadDataSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.uploadData = action.payload;
    },
    uploadDataError(state) {
      state.loading = false;
      state.error = true;
    },

    predictRequest(state, action: PayloadAction<{ modelId: number | string; body: FormData }>) {
      state.loading = true;
      state.error = false;
    },
    predictSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.predictResult = action.payload;
    },
    predictError(state) {
      state.loading = false;
      state.error = true;
    },

    resetDashboard(state) {
      state.loading = false;
      state.uploadData = undefined;
      state.predictResult = undefined;
      state.error = false;
    },
  },
});

export const { actions: dashboardActions } = slice;

export default slice.reducer;
