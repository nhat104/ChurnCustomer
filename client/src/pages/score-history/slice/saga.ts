import { call, put, takeLatest } from 'redux-saga/effects'; //

import { scoreHistoryApi } from 'src/api';

import { scoreHistoryActionss as actions } from '.';

function* scoreHistoriesRequestSaga(
  action: ReturnType<typeof actions.scoreHistoriesRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.getAll, action.payload);
    yield put(actions.scoreHistoriesSuccess(res.data));
  } catch (error) {
    yield put(actions.scoreHistoriesError());
  }
}

export function* scoreHistorySaga() {
  yield takeLatest(actions.scoreHistoriesRequest.type, scoreHistoriesRequestSaga);
}
