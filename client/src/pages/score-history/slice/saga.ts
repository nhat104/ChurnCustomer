import { call, put, takeLatest } from 'redux-saga/effects'; //
import { fDateTime } from 'src/utils/format-time';

import { scoreHistoryApi } from 'src/api';

import { scoreHistoryActionss as actions } from '.';

import type { ScoreHistoryResponse } from './types';

function* scoreHistoriesRequestSaga(
  action: ReturnType<typeof actions.scoreHistoriesRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(scoreHistoryApi.getAll, action.payload);
    const data = res?.data.map((model: ScoreHistoryResponse) => ({
      ...model,
      created_at: fDateTime(model.created_at),
      updated_at: fDateTime(model.updated_at),
    }));
    yield put(actions.scoreHistoriesSuccess(data));
  } catch (error) {
    yield put(actions.scoreHistoriesError());
  }
}

export function* scoreHistorySaga() {
  yield takeLatest(actions.scoreHistoriesRequest.type, scoreHistoriesRequestSaga);
}
