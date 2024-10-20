import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../pages/Counter/slice';

const reducer = {
  counter: counterReducer,
};

export const rootReducer = combineReducers(reducer);
