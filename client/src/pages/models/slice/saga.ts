import { call, put, takeLatest } from 'redux-saga/effects'; //

import { modelApi } from 'src/api';

import { modelsActions as actions } from '.';

function* modelsRequestSaga(
  action: ReturnType<typeof actions.modelsRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.getAll, action.payload);
    yield put(actions.modelsSuccess(res.data));
  } catch (error) {
    yield put(actions.modelsError());
  }
}

export function* modelsSaga() {
  yield takeLatest(actions.modelsRequest.type, modelsRequestSaga);
}
