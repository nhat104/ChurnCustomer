import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectLogin = (state: RootState) => state.login ?? initialState;
