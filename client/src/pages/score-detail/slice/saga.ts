import { call, put, takeLatest } from 'redux-saga/effects'; //
import { fDateTime } from 'src/utils/format-time';

import { scoreHistoryApi } from 'src/api';

import { scoreResultActions as actions } from '.';

function* scoreResultRequestSaga(
  action: ReturnType<typeof actions.scoreResultRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.getOne, action.payload);
    res.data.created_at = fDateTime(res?.data?.created_at);
    if (res?.data?.ml_model) {
      res.data.ml_model.created_at = fDateTime(res.data.ml_model.created_at);
    }
    yield put(actions.scoreResultSuccess(res.data));
  } catch (error) {
    yield put(actions.scoreResultError());
  }
}

export function* scoreResultSaga() {
  yield takeLatest(actions.scoreResultRequest.type, scoreResultRequestSaga);
}
