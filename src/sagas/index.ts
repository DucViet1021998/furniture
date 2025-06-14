import { all, fork } from "redux-saga/effects";
import { watchCheckoutSaga } from "./checkout.saga";
import { watchCountrySaga } from "./country.saga";
/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  // yield all([takeLatest(authActions.postLogin.type, postLoginSaga)]);
  yield all([fork(watchCountrySaga), fork(watchCheckoutSaga)]);
}

export default rootSaga;
