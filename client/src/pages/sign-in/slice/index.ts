import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { AuthRequest, DataAuth, LoginState } from './types';

export const initialState: LoginState = {
  loading: false,
  dataAuth: JSON.parse(localStorage.getItem('user') ?? '{}') as DataAuth,
  error: false,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<AuthRequest>) {
      state.loading = true;
      state.error = false;
    },
    loginSuccess(state, action: PayloadAction<DataAuth>) {
      state.loading = false;
      state.dataAuth = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginError(state) {
      state.loading = false;
      state.error = true;
    },

    logout(state) {
      state.dataAuth = undefined;
      localStorage.removeItem('user');
    },
  },
});

export const { actions: loginActions } = slice;

export default slice.reducer;
