/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { put, takeLatest } from 'redux-saga/effects';

import { effects as network } from '../../lib/network';
import tripActions, { TripActionConstants } from './tripActions';

function* getTrips({ payload: { personId } }) {
  try {
    const response = yield network.get(`/people/${personId}/trips`);
    const trips = response.data.data;

    yield put(tripActions.set(trips));
    yield put(tripActions.getTripsSuccess(trips));
  } catch (error) {
    yield put(tripActions.getTripsFail(error));
  }
}

function* getTrip({ payload: { personId, id } }) {
  try {
    const response = yield network.get(`/people/${personId}/trips/${id}`);
    const trip = response.data.data;

    yield put(tripActions.upsert(trip.id, trip));
    yield put(tripActions.getTripSuccess(trip));
  } catch (error) {
    yield put(tripActions.getTripFail(error));
  }
}

function* createTrip({ payload: { personId, newTrip } }) {
  try {
    const response = yield network.post(`/people/${personId}/trips`, newTrip);
    const trip = response.data.data;

    yield put(tripActions.upsert(trip.id, trip));
    yield put(tripActions.createTripSuccess(trip));
  } catch (error) {
    yield put(tripActions.createTripFail(error));
  }
}

function* updateTrip({ payload: { personId, id, updatedTrip } }) {
  try {
    const response = yield network.put(`people/${personId}/trips/${id}`, updatedTrip);
    const trip = response.data.data;

    yield put(tripActions.upsert(trip.id, trip));
    yield put(tripActions.updateTripSuccess(trip));
  } catch (error) {
    yield put(tripActions.updateTripFail(error));
  }
}

function* deleteTrip({ payload: { personId, id } }) {
  try {
    yield network.delete(`people/${personId}/trips/${id}`);
    yield put(tripActions.remove(id));
    yield put(tripActions.deleteTripSuccess());
  } catch (error) {
    yield put(tripActions.deleteTripFail(error));
  }
}

function* tripSaga() {
  yield takeLatest(TripActionConstants.GET_TRIPS, getTrips);
  yield takeLatest(TripActionConstants.GET_TRIP, getTrip);
  yield takeLatest(TripActionConstants.CREATE_TRIP, createTrip);
  yield takeLatest(TripActionConstants.UPDATE_TRIP, updateTrip);
  yield takeLatest(TripActionConstants.DELETE_TRIP, deleteTrip);
}

export {
  tripSaga as default,
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
