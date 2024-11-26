import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectModel = (state: RootState) => state.model ?? initialState;
