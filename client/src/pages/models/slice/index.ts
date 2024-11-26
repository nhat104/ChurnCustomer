import type { QueryParams } from 'src/api/type';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { ModelResponse, ModelsState } from './types';

export const initialState: ModelsState = {
  loading: false,
  dataModels: undefined,
  error: false,
};

const slice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    modelsRequest(state, action: PayloadAction<QueryParams>) {
      state.loading = true;
      state.error = false;
    },
    modelsSuccess(state, action: PayloadAction<ModelResponse[]>) {
      state.loading = false;
      state.dataModels = action.payload;
    },
    modelsError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: modelsActions } = slice;

export default slice.reducer;
