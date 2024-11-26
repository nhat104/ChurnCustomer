import { call, put, takeLatest } from 'redux-saga/effects'; //
import { modelApi } from 'src/api';

import { dashboardActions as actions } from '.';

function* uploadDataSaga(
  action: ReturnType<typeof actions.uploadDataRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.uploadData, action.payload);

    yield put(actions.uploadDataSuccess(res?.data));
  } catch (error) {
    yield put(actions.uploadDataError());
  }
}

function* predictSaga(
  action: ReturnType<typeof actions.predictRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.predict, action.payload.modelId, action.payload.body);

    yield put(actions.predictSuccess(res?.data));
  } catch (error) {
    yield put(actions.predictError());
  }
}

export function* dashboardSaga() {
  yield takeLatest(actions.uploadDataRequest.type, uploadDataSaga);
  yield takeLatest(actions.predictRequest.type, predictSaga);
}
