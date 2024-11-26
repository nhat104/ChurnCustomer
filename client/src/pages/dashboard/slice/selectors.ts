import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectDashboard = (state: RootState) => state.dashboard ?? initialState;
