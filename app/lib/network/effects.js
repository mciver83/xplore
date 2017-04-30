import { __, all, contains, keys, pick } from 'ramda';
import { call, put, select } from 'redux-saga/effects';

import { authActions, authSelectors } from '../../reducers/auth';
import api from './api';

const { freeze } = Object;

const JwtKeys = freeze(['access-token', 'token-type', 'client', 'expiry', 'uid']);

const subset = (subject, superset) => all(contains(__, superset), subject);

/**
 * Dispatches a network request.
 *
 * TODO: This call should handle appending, and inspecting, authentication values.
 * TODO: This call should handle recall logic.
 */
function* request(config = {}) {
  // Extract authentication information from redux; apply to request config as necessary.
  const isAuthenticated = yield select(authSelectors.isAuthenticated);
  const jwt = yield select(authSelectors.getJwtValues);
  const preparedConfig = isAuthenticated
    ? { ...config, headers: { ...(config.headers || {}), ...jwt } }
    : config;

  // Execute network call.
  const response = yield call(api.request, preparedConfig);

  // Extract authentication values from the headers; dispatch to redux as necessary.
  if (subset(JwtKeys, keys(response.headers))) {
    yield put(authActions.setJwt(pick(JwtKeys, response.headers)));
  }

  return response;
}

const effects = freeze({
  get: (url, config = {}) => call(request, { method: 'get', url, ...config }),
  head: (url, config = {}) => call(request, { method: 'head', url, ...config }),
  delete: (url, config = {}) => call(request, { method: 'delete', url, ...config }),
  post: (url, data, config = {}) => call(request, { method: 'post', url, data, ...config }),
  put: (url, data, config = {}) => call(request, { method: 'put', url, data, ...config }),
  patch: (url, data, config = {}) => call(request, { method: 'patch', url, data, ...config }),
});

export { effects as default };
