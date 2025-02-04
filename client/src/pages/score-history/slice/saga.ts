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

function* scoreHistoryAllUserRequestSaga(
  action: ReturnType<typeof actions.scoreHistoryAllUserRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.getAllUser, action.payload);
    yield put(actions.scoreHistoryAllUserSuccess(res.data));
  } catch (error) {
    yield put(actions.scoreHistoryAllUserError());
  }
}

export function* scoreHistorySaga() {
  yield takeLatest(actions.scoreHistoriesRequest.type, scoreHistoriesRequestSaga);
  yield takeLatest(actions.scoreHistoryAllUserRequest.type, scoreHistoryAllUserRequestSaga);
}
