import { tripActions, TripActionConstants } from '../../../app/reducers/trip';

const setup = () => {
  const personId = 1;
  const trip = { id: 1, location: 9 };
  const trips = [trip];
  const updatedTrip = { id: 1, location: 12 };

  const params = { limit: 10 };
  const error = { status: 500, message: 'all things went bad' };

  return {
    personId,
    trip,
    trips,
    updatedTrip,
    params,
    error,
  };
};

describe('tripActions', function () {
  describe('.getTrips', function () {
    it('returns an action to get trips', function () {
      const { personId } = setup();
      expect(tripActions.getTrips(personId)).to.eql({
        type: TripActionConstants.GET_TRIPS,
        payload: { personId },
      });
    });
  });

  describe('.getTripsFail', function () {
    it('returns an action indicating getting trips failed', function () {
      const { error } = setup();
      expect(tripActions.getTripsFail(error)).to.eql({
        type: TripActionConstants.GET_TRIPS_FAIL,
        payload: { error },
      });
    });
  });

  describe('.getTripsSuccess', function () {
    it('returns an action indicating getting trips succeeded', function () {
      const { trips } = setup();
      expect(tripActions.getTripsSuccess(trips)).to.eql({
        type: TripActionConstants.GET_TRIPS_SUCCESS,
        payload: { trips },
      });
    });
  });

  describe('.getTrip', function () {
    it('returns an action to get trip', function () {
      const { personId, trip: { id } } = setup();
      expect(tripActions.getTrip(personId, id)).to.eql({
        type: TripActionConstants.GET_TRIP,
        payload: { personId, id },
      });
    });
  });

  describe('.getTripFail', function () {
    it('returns an action indicating getting trip failed', function () {
      const { error } = setup();
      expect(tripActions.getTripFail(error)).to.eql({
        type: TripActionConstants.GET_TRIP_FAIL,
        payload: { error },
      });
    });
  });

  describe('.getTripSuccess', function () {
    it('returns an action indicating getting trip succeeded', function () {
      const { trip } = setup();
      expect(tripActions.getTripSuccess(trip)).to.eql({
        type: TripActionConstants.GET_TRIP_SUCCESS,
        payload: { trip },
      });
    });
  });

  describe('.createTrip', function () {
    it('returns an action to create a trip', function () {
      const { personId, trip: newTrip } = setup();
      expect(tripActions.createTrip(personId, newTrip)).to.eql({
        type: TripActionConstants.CREATE_TRIP,
        payload: { personId, newTrip },
      });
    });
  });

  describe('.createTripFail', function () {
    it('returns an action indicating creating trip failed', function () {
      const { error } = setup();
      expect(tripActions.createTripFail(error)).to.eql({
        type: TripActionConstants.CREATE_TRIP_FAIL,
        payload: { error },
      });
    });
  });

  describe('.createTripSuccess', function () {
    it('returns an action indicating creating trip succeeded', function () {
      const { trip } = setup();
      expect(tripActions.createTripSuccess(trip)).to.eql({
        type: TripActionConstants.CREATE_TRIP_SUCCESS,
        payload: { trip },
      });
    });
  });

  describe('.updateTrip', function () {
    it('returns an action to update a trip', function () {
      const { personId, trip: { id }, updatedTrip } = setup();
      expect(tripActions.updateTrip(personId, id, updatedTrip)).to.eql({
        type: TripActionConstants.UPDATE_TRIP,
        payload: { personId, id, updatedTrip },
      });
    });
  });

  describe('.updateTripFail', function () {
    it('returns an action indicating updating trip failed', function () {
      const { error } = setup();
      expect(tripActions.updateTripFail(error)).to.eql({
        type: TripActionConstants.UPDATE_TRIP_FAIL,
        payload: { error },
      });
    });
  });

  describe('.updateProRequestSuccess', function () {
    it('returns an action indicating updating trip succeeded', function () {
      const { updatedTrip } = setup();
      expect(tripActions.updateTripSuccess(updatedTrip)).to.eql({
        type: TripActionConstants.UPDATE_TRIP_SUCCESS,
        payload: { updatedTrip },
      });
    });
  });

  describe('.deleteTrip', function () {
    it('returns an action to delete a trip', function () {
      const { personId, trip: { id } } = setup();
      expect(tripActions.deleteTrip(personId, id)).to.eql({
        type: TripActionConstants.DELETE_TRIP,
        payload: { personId, id },
      });
    });
  });

  describe('.deleteTripFail', function () {
    it('returns an action indicating deleting a trip failed', function () {
      const { error } = setup();
      expect(tripActions.deleteTripFail(error)).to.eql({
        type: TripActionConstants.DELETE_TRIP_FAIL,
        payload: { error },
      });
    });
  });

  describe('.deleteTripSuccess', function () {
    it('returns an action indicating deleting a trip succeded', function () {
      expect(tripActions.deleteTripSuccess()).to.eql({
        type: TripActionConstants.DELETE_TRIP_SUCCESS,
        payload: {},
      });
    });
  });
});
