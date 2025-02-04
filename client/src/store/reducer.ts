import { combineReducers, type UnknownAction } from '@reduxjs/toolkit';

import modelsReducer from 'src/pages/models/slice';
import modelReducer from 'src/pages/model-detail/slice';
import dashboardReducer from 'src/pages/dashboard/slice';
import scoreResultReducer from 'src/pages/score-detail/slice';
import scoreHistoryReducer from 'src/pages/score-history/slice';
import authReducer, { authActions } from 'src/pages/sign-in/slice';

const appReducer = combineReducers({
  auth: authReducer,
  model: modelReducer,
  models: modelsReducer,
  dashboard: dashboardReducer,
  scoreResult: scoreResultReducer,
  scoreHistory: scoreHistoryReducer,
});

type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: UnknownAction) => {
  if (action.type === authActions.logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};
