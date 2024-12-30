import { call, put, takeLatest } from 'redux-saga/effects'; //

import { modelApi } from 'src/api';

import { modelActions as actions } from '.';

function* modelRequestSaga(
  action: ReturnType<typeof actions.modelRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(modelApi.getOne, action.payload);
    if (res?.data?.attributes) {
      res.data.attributes = res.data.attributes.reduce(
        (acc: any, cur: { name: string; value: string }) => {
          if (
            cur.name === 'density_distribution' ||
            cur.name === 'ks_score_series' ||
            cur.name === 'roc_auc_series' ||
            cur.name === 'y_test' ||
            cur.name === 'y_pred'
          ) {
            acc[cur.name] = JSON.parse(cur.value.replace(/'/g, '"')) ?? [];
            return acc;
          }
          if (cur.name === 'ks_score_attr') {
            acc[cur.name] = JSON.parse(cur.value.replace(/'/g, '"')) ?? {};
            return acc;
          }
          acc[cur.name] = cur.value;
          return acc;
        },
        {}
      );
    }

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
    yield put(actions.scoreByModelSuccess(res.data));
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
