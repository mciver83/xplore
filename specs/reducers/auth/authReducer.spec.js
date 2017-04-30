import { authActions, authReducer, initialState } from '../../../app/reducers/auth';

const setup = () => {
  const error = { status: 401, message: 'Meaning is absent?' };
  const response = { data: { id: 1, email: 'john.doe@example.com' } };
  const jwt = {
    'Access-Token': 'abc',
    'Token-Type': 'Bearer',
    Client: 'iPhone',
    Expiry: 123,
    Uid: 'john.doe@example.com',
  };

  return { error, jwt, response };
};

describe('authReducer', function () {
  context('when invoked with the action of type "LOGIN"', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();

      const state = { ...initialState, fetching: false, fetchError };
      const action = authActions.login();

      expect(authReducer(state, action)).to.include({
        fetching: true,
        fetchError: null,
      });
    });
  });

  context('when invoked with the action of type "LOGIN_FAIL"', function () {
    it('modifies the state to indicate the network request failed', function () {
      const { error } = setup();

      const state = { ...initialState, fetching: true, fetchError: null };
      const action = authActions.loginFail(error);

      expect(authReducer(state, action)).to.include({
        fetching: false,
        fetchError: error,
      });
    });
  });

  context('when invoked with the action of type "LOGIN_SUCCESS"', function () {
    it('modifies the state to indicate the network request succeeded', function () {
      const { error: fetchError, response } = setup();

      const state = { ...initialState, fetching: true, fetchError };
      const action = authActions.loginSuccess(response);

      expect(authReducer(state, action)).to.include({
        fetching: false,
        fetchError: null,
      });
    });
  });

  context('when invoked with the action of type "SET_JWT"', function () {
    it('updates the state to include the JWT token values', function () {
      const { jwt } = setup();

      const state = { ...initialState, jwt: null };
      const action = authActions.setJwt(jwt);

      expect(authReducer(state, action).jwt).to.eql(jwt);
    });
  });
});
