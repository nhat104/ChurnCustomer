import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectScoreResult = (state: RootState) => state.scoreResult ?? initialState;
