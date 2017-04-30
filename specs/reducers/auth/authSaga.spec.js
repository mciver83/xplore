import { put } from 'redux-saga/effects';

import { authActions } from '../../../app/reducers/auth';
import { effects as network, defaultConfig } from '../../../app/lib/network';
import { login } from '../../../app/reducers/auth/authSaga';

const setup = () => {
  const values = { email: 'john.doe@example.com', password: 'password' };
  const user = { id: 1, email: 'john.doe@example.com', password: 'password' };
  const error = { status: 500, message: 'Server is done communicating BOOM' };

  return { error, user, values, ...authActions };
};

describe('authSaga', function () {
  describe('.login', function () {
    beforeEach(function () {
      const { values } = setup();

      this.iterator = login(authActions.login(values));
    });

    it('calls the API', function () {
      const { values } = setup();

      expect(this.iterator.next().value).to.eql(network.post('/sign_in', values, {
        baseURL: defaultConfig.authURL,
      }));
    });

    context('when the network request fails', function () {
      it('dispatches the "LOGIN_FAIL" action', function () {
        const { error, loginFail } = setup();

        this.iterator.next();

        expect(this.iterator.throw(error).value).to.eql(put(loginFail(error)));
      });
    });

    context('when the network request succeeds', function () {
      it('dispatches the "LOGIN_SUCCESS" action', function () {
        const { loginSuccess, user } = setup();

        this.iterator.next();
        const current = this.iterator.next({ data: user });

        expect(current.value).to.eql(put(loginSuccess(user)));
      });
    });
  });
});
