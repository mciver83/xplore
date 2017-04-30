import { authActions, AuthActionsConst } from '../../../app/reducers/auth';

const setup = () => {
  const values = { email: 'john.doe@example.com', password: 'password' };
  const error = { status: 422, message: 'All things are invalid' };
  const response = { data: { id: 1, email: values.email } };
  const jwt = {
    'Access-Token': 'abc',
    'Token-Type': 'Bearer',
    Client: 'iPhone',
    Expiry: 123,
    Uid: 'john.doe@example.com',
  };

  return { error, jwt, response, values };
};

describe('authActions', function () {
  describe('.login', function () {
    it('returns an action to login', function () {
      const { values } = setup();

      expect(authActions.login(values)).to.eql({
        type: AuthActionsConst.LOGIN,
        payload: { values },
      });
    });
  });

  describe('.loginFail', function () {
    it('returns an action to indicate login failed', function () {
      const { error } = setup();

      expect(authActions.loginFail(error)).to.eql({
        type: AuthActionsConst.LOGIN_FAIL,
        payload: error,
      });
    });
  });

  describe('.loginSuccess', function () {
    it('returns an action to indicate login was successful', function () {
      const { response } = setup();

      expect(authActions.loginSuccess(response)).to.eql({
        type: AuthActionsConst.LOGIN_SUCCESS,
        payload: response,
      });
    });
  });

  describe('.setJwt', function () {
    it('returns an action to set the JWT token values', function () {
      const { jwt } = setup();

      expect(authActions.setJwt(jwt)).to.eql({
        type: AuthActionsConst.SET_JWT,
        payload: jwt,
      });
    });
  });
});
