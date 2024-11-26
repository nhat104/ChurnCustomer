import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectModels = (state: RootState) => state.models ?? initialState;
