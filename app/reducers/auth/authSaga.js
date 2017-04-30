import { put, takeLatest } from 'redux-saga/effects';

import { effects as network, defaultConfig } from '../../lib/network';
import authActions, { AuthActionsConst } from './authActions';

/**
 * Attempts to login the user.
 *
 * @return {object} effect instructing redux-saga how to proceed.
 */
function* login({ payload: { values } }) {
  try {
    const response = yield network.post('/sign_in', values, { baseURL: defaultConfig.authURL });

    yield put(authActions.loginSuccess(response.data));
  } catch (error) {
    yield put(authActions.loginFail(error));
  }
}

/**
 * Registers a collection of sagas related to the auth redux state slice.
 *
 * @return {object} effect instructing redux-saga which actions are of importance.
 */
function* authSaga() {
  yield takeLatest(AuthActionsConst.LOGIN, login);
}

export { authSaga as default, login };
