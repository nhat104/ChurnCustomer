import { call, put, takeLatest } from 'redux-saga/effects'; //
import { fDateTime } from 'src/utils/format-time';

import { modelApi } from 'src/api';

import { modelsActions as actions } from '.';

import type { ModelResponse } from './types';

function* modelsRequestSaga(
  action: ReturnType<typeof actions.modelsRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.getAll, action.payload);
    const data = res?.data.map((model: ModelResponse) => ({
      ...model,
      created_at: fDateTime(model.created_at),
      updated_at: fDateTime(model.updated_at),
    }));
    yield put(actions.modelsSuccess(data));
  } catch (error) {
    yield put(actions.modelsError());
  }
}

export function* modelsSaga() {
  yield takeLatest(actions.modelsRequest.type, modelsRequestSaga);
}
