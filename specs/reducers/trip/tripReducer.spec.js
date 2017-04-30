import {
  tripActions,
  tripReducer,
  initialState,
} from '../../../app/reducers/trip';

const setup = () => {
  const trip = { id: 1, location: 9 };
  const trips = [trip];

  const params = { limit: 10 };
  const error = { status: 500, message: 'all things went bad' };

  return { trip, trips, params, error };
};

describe('tripReducer', function () {
  context('when invoked with an unsupported aciton', function () {
    it('returns the state unchanged', function () {
      const state = { ...initialState, fetching: true };
      const action = { type: 'unsupported', payload: {} };

      expect(tripReducer(state, action)).to.equal(state);
    });
  });

  context('when invoked with the action GET_TRIPS', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: false, fetchError };
      const action = tripActions.getTrips();

      expect(tripReducer(state, action)).to.include({ fetching: true, fetchError: null });
    });
  });

  context('when invoked with the action GET_TRIPS_FAIL', function () {
    it('modifies the state to indicate the network request failed', function () {
      const { error } = setup();
      const state = { ...initialState, fetching: true, fetchError: null };
      const action = tripActions.getTripsFail(error);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: error });
    });
  });

  context('when invoked with the action GET_TRIPS_SUCCESS', function () {
    it('modifies the state to indicate the network request was a success', function () {
      const { trips, error: fetchError } = setup();
      const state = { ...initialState, fetching: true, fetchError };
      const action = tripActions.getTripsSuccess(trips);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: null });
    });
  });

  context('when invoked with the action GET_TRIP', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: false, fetchError };
      const action = tripActions.getTrip();

      expect(tripReducer(state, action)).to.include({ fetching: true, fetchError: null });
    });
  });

  context('when invoked with the action GET_TRIP_FAIL', function () {
    it('modifies the state to inicate the network request failed', function () {
      const { error } = setup();
      const state = { ...initialState, fetching: true, fetchError: null };
      const action = tripActions.getTripFail(error);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: error });
    });
  });

  context('when invoked with the action GET_TRIP_SUCCESS', function () {
    it('modifies the state to indicate the network request was a success', function () {
      const { trip, error: fetchError } = setup();
      const state = { ...initialState, fetching: true, fetchError };
      const action = tripActions.getTripSuccess(trip);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: null });
    });
  });

  context('when invoked with the action CREATE_TRIP', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: false, fetchError };
      const action = tripActions.createTrip();

      expect(tripReducer(state, action)).to.include({ fetching: true, fetchError: null });
    });
  });

  context('when invoked with the action CREATE_TRIP_FAIL', function () {
    it('modifies the state to inicate the network request failed', function () {
      const { error } = setup();
      const state = { ...initialState, fetching: true, fetchError: null };
      const action = tripActions.createTripFail(error);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: error });
    });
  });

  context('when invoked with the action CREATE_TRIP_SUCCESS', function () {
    it('modifies the state to indicate the network request was a success', function () {
      const { trip, error: fetchError } = setup();
      const state = { ...initialState, fetching: true, fetchError };
      const action = tripActions.createTripSuccess(trip);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: null });
    });
  });

  context('when invoked with the action UPDATE_TRIP', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: false, fetchError };
      const action = tripActions.updateTrip();

      expect(tripReducer(state, action)).to.include({ fetching: true, fetchError: null });
    });
  });

  context('when invoked with the action UPDATE_TRIP_FAIL', function () {
    it('modifies the state to indicate the network request failed', function () {
      const { error } = setup();
      const state = { ...initialState, fetching: true, fetchError: null };
      const action = tripActions.updateTripFail(error);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: error });
    });
  });

  context('when invoked with the action UPDATE_TRIP_SUCCESS', function () {
    it('modifies the state to indicate the network request was a success', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: true, fetchError };
      const action = tripActions.updateTripSuccess();

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: null });
    });
  });

  context('when invoked with the action DELETE_TRIP', function () {
    it('modifies the state to indicate there is an active network request', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: false, fetchError };
      const action = tripActions.deleteTrip();

      expect(tripReducer(state, action)).to.include({ fetching: true, fetchError: null });
    });
  });

  context('when invoked with the action DELETE_TRIP_FAIL', function () {
    it('modifies the state to indicate the network request failed', function () {
      const { error } = setup();
      const state = { ...initialState, fetching: true, fetchError: null };
      const action = tripActions.deleteTripFail(error);

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: error });
    });
  });

  context('when invoked with the action DELETE_TRIP_SUCCESS', function () {
    it('modifies the state to indicate the network request was a success', function () {
      const { error: fetchError } = setup();
      const state = { ...initialState, fetching: true, fetchError };
      const action = tripActions.deleteTripSuccess();

      expect(tripReducer(state, action)).to.include({ fetching: false, fetchError: null });
    });
  });
});
