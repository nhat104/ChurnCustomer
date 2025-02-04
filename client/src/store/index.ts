import type { Action, ThunkAction } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import rootSaga from './rootSaga';
import { rootReducer } from './reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
