import type { RootState } from 'src/store';

import { initialState } from '.';

export const selectAuth = (state: RootState) => state.auth ?? initialState;
