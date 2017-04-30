import { createSelector, defaultMemoize } from 'reselect';

const { freeze } = Object;

const getJwtValues = defaultMemoize(state => (state && state.auth && state.auth.jwt) || null);

const isAuthenticated = createSelector(getJwtValues, jwt => !!jwt);

const isFetching = defaultMemoize(state => !!(state && state.auth && state.auth.fetching));

/**
 * Collection of selectors related to authentication.
 */
const authSelectors = freeze({
  getJwtValues,
  isAuthenticated,
  isFetching,
});

export { authSelectors as default };
