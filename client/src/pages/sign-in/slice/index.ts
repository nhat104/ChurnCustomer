import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { SigninRequest, DataAuth, AuthState, SignupRequest } from './types';

export const initialState: AuthState = {
  loading: false,
  dataAuth: JSON.parse(localStorage.getItem('user') ?? '{}') as DataAuth,
  error: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<SigninRequest>) {
      state.loading = true;
      state.error = '';
    },
    loginSuccess(state, action: PayloadAction<DataAuth>) {
      state.loading = false;
      state.dataAuth = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    signupRequest(state, action: PayloadAction<SignupRequest>) {
      state.loading = true;
      state.error = '';
    },
    signupSuccess(state, action: PayloadAction<DataAuth>) {
      state.loading = false;
      state.dataAuth = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    signupError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.dataAuth = undefined;
      localStorage.removeItem('user');
    },

    resetAuth(state) {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { actions: authActions } = slice;

export default slice.reducer;
