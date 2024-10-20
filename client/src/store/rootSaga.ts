import { all } from 'redux-saga/effects';

import counterSaga from 'src/pages/Counter/slice/saga';

export default function* rootSaga() {
  console.log('root Saga');

  yield all([counterSaga()]);
}
