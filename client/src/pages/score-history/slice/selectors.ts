import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectScoreHistory = (state: RootState) => state.scoreHistory ?? initialState;
