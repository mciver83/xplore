/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { createEntityActionConstants, createEntityActionCreators } from '../shared/entity';

const { freeze } = Object;

const TripActionConstants = freeze({
  ...createEntityActionConstants('TRIP'),

  GET_TRIPS: 'GET_TRIPS',
  GET_TRIPS_FAIL: 'GET_TRIPS_FAIL',
  GET_TRIPS_SUCCESS: 'GET_TRIPS_SUCCESS',

  GET_TRIP: 'GET_TRIP',
  GET_TRIP_FAIL: 'GET_TRIP_FAIL',
  GET_TRIP_SUCCESS: 'GET_TRIP_SUCCESS',

  CREATE_TRIP: 'CREATE_TRIP',
  CREATE_TRIP_FAIL: 'CREATE_TRIP_FAIL',
  CREATE_TRIP_SUCCESS: 'CREATE_TRIP_SUCCESS',

  UPDATE_TRIP: 'UPDATE_TRIP',
  UPDATE_TRIP_FAIL: 'UPDATE_TRIP_FAIL',
  UPDATE_TRIP_SUCCESS: 'UPDATE_TRIP_SUCCESS',

  DELETE_TRIP: 'DELETE_TRIP',
  DELETE_TRIP_FAIL: 'DELETE_TRIP_FAIL',
  DELETE_TRIP_SUCCESS: 'DELETE_TRIP_SUCCESS',
});

const tripActions = freeze({
  ...createEntityActionCreators('TRIP'),

  getTrips(personId) {
    return {
      type: TripActionConstants.GET_TRIPS,
      payload: { personId },
    };
  },

  getTripsFail(error) {
    return {
      type: TripActionConstants.GET_TRIPS_FAIL,
      payload: { error },
    };
  },

  getTripsSuccess(trips) {
    return {
      type: TripActionConstants.GET_TRIPS_SUCCESS,
      payload: { trips },
    };
  },

  getTrip(personId, id) {
    return {
      type: TripActionConstants.GET_TRIP,
      payload: { personId, id },
    };
  },

  getTripFail(error) {
    return {
      type: TripActionConstants.GET_TRIP_FAIL,
      payload: { error },
    };
  },

  getTripSuccess(trip) {
    return {
      type: TripActionConstants.GET_TRIP_SUCCESS,
      payload: { trip },
    };
  },

  createTrip(personId, newTrip) {
    return {
      type: TripActionConstants.CREATE_TRIP,
      payload: { personId, newTrip },
    };
  },

  createTripFail(error) {
    return {
      type: TripActionConstants.CREATE_TRIP_FAIL,
      payload: { error },
    };
  },

  createTripSuccess(trip) {
    return {
      type: TripActionConstants.CREATE_TRIP_SUCCESS,
      payload: { trip },
    };
  },

  updateTrip(personId, id, updatedTrip) {
    return {
      type: TripActionConstants.UPDATE_TRIP,
      payload: { personId, id, updatedTrip },
    };
  },

  updateTripFail(error) {
    return {
      type: TripActionConstants.UPDATE_TRIP_FAIL,
      payload: { error },
    };
  },

  updateTripSuccess(updatedTrip) {
    return {
      type: TripActionConstants.UPDATE_TRIP_SUCCESS,
      payload: { updatedTrip },
    };
  },

  deleteTrip(personId, id) {
    return {
      type: TripActionConstants.DELETE_TRIP,
      payload: { personId, id },
    };
  },

  deleteTripFail(error) {
    return {
      type: TripActionConstants.DELETE_TRIP_FAIL,
      payload: { error },
    };
  },

  deleteTripSuccess() {
    return {
      type: TripActionConstants.DELETE_TRIP_SUCCESS,
      payload: {},
    };
  },
});

export { tripActions as default, TripActionConstants };
