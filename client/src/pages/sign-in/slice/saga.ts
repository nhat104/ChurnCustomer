import { call, put, takeLatest } from 'redux-saga/effects'; //
import { authApi } from 'src/api';

import { authActions as actions } from '.';

function* loginRequestSaga(
  action: ReturnType<typeof actions.loginRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(actions.loginSuccess(res));
  } catch (error) {
    yield put(actions.loginError(error?.message ?? ''));
  }
}

function* signupRequestSaga(
  action: ReturnType<typeof actions.signupRequest>
): Generator<any, void, any> {
  try {
    const res = yield call(authApi.signup, action.payload);
    yield put(actions.signupSuccess(res));
  } catch (error) {
    yield put(actions.signupError(error?.response?.data?.message ?? ''));
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, loginRequestSaga);
  yield takeLatest(actions.signupRequest.type, signupRequestSaga);
}
