import { combineReducers } from '@reduxjs/toolkit';

import authReducer from 'src/pages/sign-in/slice';
import modelsReducer from 'src/pages/models/slice';
import modelReducer from 'src/pages/model-detail/slice';
import dashboardReducer from 'src/pages/dashboard/slice';
import scoreResultReducer from 'src/pages/score-detail/slice';
import scoreHistoryReducer from 'src/pages/score-history/slice';

const reducer = {
  auth: authReducer,
  model: modelReducer,
  models: modelsReducer,
  dashboard: dashboardReducer,
  scoreResult: scoreResultReducer,
  scoreHistory: scoreHistoryReducer,
};

export const rootReducer = combineReducers(reducer);
