import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

import { call, put, takeLatest } from 'redux-saga/effects'; //
import { fDateTime } from 'src/utils/format-time';

import { modelApi } from 'src/api';

import { modelActions as actions } from '.';

function* modelRequestSaga(
  action: ReturnType<typeof actions.modelRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.getOne, action.payload);
    res.data.created_at = fDateTime(res.data.created_at);
    yield put(actions.modelSuccess(res?.data));
  } catch (error) {
    yield put(actions.modelError());
  }
}

function* updateModelSaga(
  action: ReturnType<typeof actions.updateModelRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.update, action.payload.id, action.payload.body);
    res.data.created_at = fDateTime(res.data.created_at);
    yield put(actions.updateModelSuccess(res?.data));
  } catch (error) {
    yield put(actions.updateModelError());
  }
}

function* deleteModelSaga(
  action: ReturnType<typeof actions.deleteModelRequest>
): Generator<any, void, any> {
  try {
    yield call(modelApi.delete, action.payload);
    yield put(actions.deleteModelSuccess());
  } catch (error) {
    yield put(actions.deleteModelError());
  }
}

function* scoresByModelRequestSaga(
  action: ReturnType<typeof actions.scoresByModelRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.getScoreHistory, action.payload);
    const data = res?.data.map((model: ScoreHistoryResponse) => ({
      ...model,
      created_at: fDateTime(model.created_at),
      updated_at: fDateTime(model.updated_at),
    }));
    yield put(actions.scoreByModelSuccess(data));
  } catch (error) {
    yield put(actions.scoreByModelError());
  }
}

export function* modelSaga() {
  yield takeLatest(actions.modelRequest.type, modelRequestSaga);
  yield takeLatest(actions.updateModelRequest.type, updateModelSaga);
  yield takeLatest(actions.deleteModelRequest.type, deleteModelSaga);
  yield takeLatest(actions.scoresByModelRequest.type, scoresByModelRequestSaga);
}
