import { delay, takeEvery } from 'redux-saga/effects';

import { increment } from '.';

function* incrementAsyncSaga() {
  yield delay(1000);
  console.log('incrementAsync');
}

export default function* counterSaga() {
  yield takeEvery(increment.type, incrementAsyncSaga);
}
