import { call, put, takeLatest } from 'redux-saga/effects'; //

import { scoreHistoryApi, scoreResultApi } from 'src/api';

import { scoreResultActions as actions } from '.';

function* scoreResultRequestSaga(
  action: ReturnType<typeof actions.scoreResultRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.getOne, action.payload);
    yield put(actions.scoreResultSuccess(res.data));
  } catch (error) {
    yield put(actions.scoreResultError());
  }
}

function* scoreWithInterpretationSaga(
  action: ReturnType<typeof actions.scoreWithInterpretationRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreResultApi.getOne, action.payload);
    if (res?.data?.interpretation) {
      res.data.interpretation = JSON.parse(res.data.interpretation.replace(/'/g, '"')) ?? [];
    }
    yield put(actions.scoreWithInterpretationSuccess(res.data));
  } catch (error) {
    yield put(actions.scoreWithInterpretationError());
  }
}

function* updateScoreHistoryRequestSaga(
  action: ReturnType<typeof actions.updateScoreHistoryRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.update, action.payload.id, action.payload.body);
    yield put(actions.updateScoreHistorySuccess(res.data));
  } catch (error) {
    yield put(actions.updateScoreHistoryError());
  }
}

function* deleteScoreHistoryRequestSaga(
  action: ReturnType<typeof actions.deleteScoreHistoryRequest>
): Generator<any, void, any> {
  try {
    yield call(scoreHistoryApi.delete, action.payload);
    yield put(actions.deleteScoreHistorySuccess());
  } catch (error) {
    yield put(actions.deleteScoreHistoryError());
  }
}

export function* scoreResultSaga() {
  yield takeLatest(actions.scoreResultRequest.type, scoreResultRequestSaga);
  yield takeLatest(actions.scoreWithInterpretationRequest.type, scoreWithInterpretationSaga);
  yield takeLatest(actions.updateScoreHistoryRequest.type, updateScoreHistoryRequestSaga);
  yield takeLatest(actions.deleteScoreHistoryRequest.type, deleteScoreHistoryRequestSaga);
}
