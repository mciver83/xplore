/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { createEntityReducer } from '../shared/entity';
import { TripActionConstants } from './tripActions';

const { freeze } = Object;

const initialState = freeze({
  // Collection of companies indexed by their id.
  byId: {},

  // Ordered collection of company ids.
  ids: [],

  // A value indicating whether there is an active network request.
  fetching: false,

  // Error object if the previous network request failed.
  fetchError: null,
});

const startNetworkRequest = state => ({ ...state, fetching: true, fetchError: null });
const terminateNetworkRequest = (state, fetchError) => ({ ...state, fetching: false, fetchError });
const completeNetworkRequest = state => ({ ...state, fetching: false, fetchError: null });

function baseReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TripActionConstants.GET_TRIPS:
      return startNetworkRequest(state);
    case TripActionConstants.GET_TRIPS_FAIL:
      return terminateNetworkRequest(state, action.payload.error);
    case TripActionConstants.GET_TRIPS_SUCCESS:
      return completeNetworkRequest(state);

    case TripActionConstants.GET_TRIP:
      return startNetworkRequest(state);
    case TripActionConstants.GET_TRIP_FAIL:
      return terminateNetworkRequest(state, action.payload.error);
    case TripActionConstants.GET_TRIP_SUCCESS:
      return completeNetworkRequest(state);

    case TripActionConstants.CREATE_TRIP:
      return startNetworkRequest(state);
    case TripActionConstants.CREATE_TRIP_FAIL:
      return terminateNetworkRequest(state, action.payload.error);
    case TripActionConstants.CREATE_TRIP_SUCCESS:
      return completeNetworkRequest(state);

    case TripActionConstants.UPDATE_TRIP:
      return startNetworkRequest(state);
    case TripActionConstants.UPDATE_TRIP_FAIL:
      return terminateNetworkRequest(state, action.payload.error);
    case TripActionConstants.UPDATE_TRIP_SUCCESS:
      return completeNetworkRequest(state);

    case TripActionConstants.DELETE_TRIP:
      return startNetworkRequest(state);
    case TripActionConstants.DELETE_TRIP_FAIL:
      return terminateNetworkRequest(state, action.payload.error);
    case TripActionConstants.DELETE_TRIP_SUCCESS:
      return completeNetworkRequest(state);

    default:
      return state;
  }
}

/**
 * For now this is a "dummy" reducer, meaning it just returns the state is given.
 *
 * @param {object} state :: company state slice.
 * @return {object} updated state slice.
 */
const tripReducer = createEntityReducer('TRIP')(baseReducer);

export { tripReducer as default, initialState };
