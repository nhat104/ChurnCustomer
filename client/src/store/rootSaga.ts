import { all } from 'redux-saga/effects';

import { modelsSaga } from 'src/pages/models/slice/saga';
import { loginSaga } from 'src/pages/sign-in/slice/saga';
import { modelSaga } from 'src/pages/model-detail/slice/saga';
import { dashboardSaga } from 'src/pages/dashboard/slice/saga';
import { scoreResultSaga } from 'src/pages/score-detail/slice/saga';
import { scoreHistorySaga } from 'src/pages/score-history/slice/saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    modelSaga(),
    modelsSaga(),
    dashboardSaga(),
    scoreResultSaga(),
    scoreHistorySaga(),
  ]);
}
