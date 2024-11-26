import { call, put, takeLatest } from 'redux-saga/effects'; //
import { authApi } from 'src/api';

import { loginActions as actions } from '.';

function* loginRequestSaga(
  action: ReturnType<typeof actions.loginRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(actions.loginSuccess(res));
  } catch (error) {
    yield put(actions.loginError());
  }
}

export function* loginSaga() {
  yield takeLatest(actions.loginRequest.type, loginRequestSaga);
}
