const { freeze } = Object;

const AuthActionsConst = freeze({
  LOGIN: 'AUTH_LOGIN',
  LOGIN_FAIL: 'AUTH_LOGIN_FAIL',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',

  SET_JWT: 'AUTH_SET_JWT',
});

const authActions = freeze({
  login(values) {
    return {
      type: AuthActionsConst.LOGIN,
      payload: { values },
    };
  },

  loginFail(error) {
    return {
      type: AuthActionsConst.LOGIN_FAIL,
      payload: error,
    };
  },

  loginSuccess(response) {
    return {
      type: AuthActionsConst.LOGIN_SUCCESS,
      payload: response,
    };
  },

  setJwt(tokenValues) {
    return {
      type: AuthActionsConst.SET_JWT,
      payload: tokenValues,
    };
  },
});

export { authActions as default, AuthActionsConst };
