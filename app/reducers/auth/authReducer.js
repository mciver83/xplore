import { AuthActionsConst } from './authActions';

const { freeze } = Object;

const initialState = freeze({
  // A value indicating whether there is an active network request.
  fetching: false,

  // A value indicating why the most recent network request failed; null otherwise.
  fetchError: null,

  // A collection of JWT related token values.
  // IMPORTANT: This should be `null` when the user is not authenticated.
  jwt: null,
});

const startNetworkRequest = state => ({ ...state, fetching: true, fetchError: null });
const terminateNetworkRequest = (state, fetchError) => ({ ...state, fetching: false, fetchError });
const completeNetworkRequest = state => ({ ...state, fetching: false, fetchError: null });
const setJwt = (state, jwt) => ({ ...state, jwt });

/**
 * Updates the auth state slice based on the type/payload of `action`.
 *
 * @param {object} state :: current auth state slice.
 * @param {object} action :: current redux action.
 * @return {object} updated auth state slice.
 */
function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case AuthActionsConst.LOGIN:
      return startNetworkRequest(state);
    case AuthActionsConst.LOGIN_FAIL:
      return terminateNetworkRequest(state, action.payload);
    case AuthActionsConst.LOGIN_SUCCESS:
      return completeNetworkRequest(state);

    case AuthActionsConst.SET_JWT:
      return setJwt(state, action.payload);

    default: return state;
  }
}

export { authReducer as default, initialState };
