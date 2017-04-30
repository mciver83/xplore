import { authSelectors } from '../../../app/reducers/auth';

const now = Date.now();
const { freeze } = Object;

const setup = () => {
  const jwt = freeze({
    'Access-Token': 'abc123',
    'Token-Type': 'Bearer',
    Client: 'iPhone',
    Expiry: now,
    Uid: 'u@example.com',
  });

  const authenticatedState = freeze({ auth: freeze({ jwt }) });
  const unauthenticatedState = freeze({ auth: freeze({ jwt: null }) });

  return { authenticatedState, jwt, unauthenticatedState };
};

describe('authSelectors', function () {
  describe('.isAuthenticated', function () {
    context('when JWT token values are set', function () {
      it('returns true', function () {
        const { authenticatedState } = setup();

        expect(authSelectors.isAuthenticated(authenticatedState)).to.be.true;
      });
    });

    context('when JWT token values are not set', function () {
      it('returns false', function () {
        const { unauthenticatedState } = setup();

        expect(authSelectors.isAuthenticated(unauthenticatedState)).to.be.false;
      });
    });
  });

  describe('.getJwtValues', function () {
    context('when the user is not authenticated', function () {
      it('returns null', function () {
        const { unauthenticatedState } = setup();

        expect(authSelectors.getJwtValues(unauthenticatedState)).to.be.null;
      });
    });

    context('when the user is authenticated', function () {
      it('returns a collection of JWT values', function () {
        const { authenticatedState, jwt } = setup();

        expect(authSelectors.getJwtValues(authenticatedState)).to.eql(jwt);
      });
    });
  });
});
