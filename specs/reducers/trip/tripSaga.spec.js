import { put } from 'redux-saga/effects';

import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} from '../../../app/reducers/trip/tripSaga';
import { effects as network } from '../../../app/lib/network';
import { tripActions } from '../../../app/reducers/trip';

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
    params,
    error,
    updatedTrip,
    ...tripActions };
};

describe('tripSaga', function () {
  describe('.getTrips', function () {
    let iterator = null;
    beforeEach(function () {
      const { personId } = setup();
      iterator = getTrips(tripActions.getTrips(personId));
    });

    it('will call the API', function () {
      const { personId } = setup();
      expect(iterator.next().value).to.eql(network.get(`/people/${personId}/trips`));
    });

    context('when an error is raised', function () {
      it('will put getTripsFail', function () {
        const { error, getTripsFail } = setup();
        iterator.next();
        const result = iterator.throw(error);
        expect(result.value).to.eql(put(getTripsFail(error)));
      });
    });

    context('when network request succeeds', function () {
      it('will put set', function () {
        const { trips, set } = setup();
        iterator.next();
        const result = iterator.next({ data: { data: trips } });
        expect(result.value).to.eql(put(set(trips)));
      });

      it('will put getTripsSuccess', function () {
        const { trips, getTripsSuccess } = setup();
        iterator.next();
        iterator.next({ data: { data: trips } });
        const result = iterator.next();
        expect(result.value).to.eql(put(getTripsSuccess(trips)));
      });
    });
  });

  describe('.getTrip', function () {
    let iterator = null;
    beforeEach(function () {
      const { personId, trip: { id } } = setup();
      iterator = getTrip(tripActions.getTrip(personId, id));
    });

    it('will call the API', function () {
      const { personId, trip: { id } } = setup();
      expect(iterator.next().value).to.eql(network.get(`/people/${personId}/trips/${id}`));
    });

    context('when an error is raised', function () {
      it('will put getTripFail', function () {
        const { error, getTripFail } = setup();
        iterator.next();
        const result = iterator.throw(error);
        expect(result.value).to.eql(put(getTripFail(error)));
      });
    });

    context('when network request succeeds', function () {
      it('will put upsert', function () {
        const { trip, upsert } = setup();
        iterator.next();
        const result = iterator.next({ data: { data: trip } });
        expect(result.value).to.eql(put(upsert(trip.id, trip)));
      });

      it('will put getTripSuccess', function () {
        const { trip, getTripSuccess } = setup();
        iterator.next();
        iterator.next({ data: { data: trip } });
        const result = iterator.next();
        expect(result.value).to.eql(put(getTripSuccess(trip)));
      });
    });
  });

  describe('.createTrip', function () {
    let iterator = null;
    beforeEach(function () {
      const { personId, trip: newTrip } = setup();
      iterator = createTrip(
        tripActions.createTrip(personId, newTrip));
    });

    it('will call the API', function () {
      const { personId, trip: newTrip } = setup();
      expect(iterator.next().value).to.eql(
        network.post(`/people/${personId}/trips`, newTrip));
    });

    context('when an error is raised', function () {
      it('will put createTripFail', function () {
        const { error, createTripFail } = setup();
        iterator.next();
        const result = iterator.throw(error);
        expect(result.value).to.eql(put(createTripFail(error)));
      });
    });

    context('when network request succeeds', function () {
      it('will put upsert', function () {
        const { trip, upsert } = setup();
        iterator.next();
        const result = iterator.next({ data: { data: trip } });
        expect(result.value).to.eql(put(upsert(trip.id, trip)));
      });

      it('will put getTripSuccess', function () {
        const { trip, createTripSuccess } = setup();
        iterator.next();
        iterator.next({ data: { data: trip } });
        const result = iterator.next();
        expect(result.value).to.eql(put(createTripSuccess(trip)));
      });
    });
  });

  describe('.updateTrip', function () {
    let iterator = null;
    beforeEach(function () {
      const { personId, trip: { id }, updatedTrip } = setup();
      iterator = updateTrip(tripActions.updateTrip(
        personId,
        id,
        updatedTrip));
    });

    it('will call the API', function () {
      const { personId, trip: { id }, updatedTrip } = setup();
      const url = `people/${personId}/trips/${id}`;
      expect(iterator.next().value).to.eql(network.put(url, updatedTrip));
    });

    context('when an error is raised', function () {
      it('will put updateTripFail', function () {
        const { error, updateTripFail } = setup();
        iterator.next();
        const result = iterator.throw(error);
        expect(result.value).to.eql(put(updateTripFail(error)));
      });
    });

    context('when network request succeeds', function () {
      it('will put upsert', function () {
        const { updatedTrip, upsert } = setup();
        iterator.next();
        const result = iterator.next({ data: { data: updatedTrip } });
        expect(result.value).to.eql(put(upsert(updatedTrip.id, updatedTrip)));
      });

      it('will put updateTripSuccess', function () {
        const { updatedTrip, updateTripSuccess } = setup();
        iterator.next();
        iterator.next({ data: { data: updatedTrip } });
        expect(iterator.next().value).to.eql(put(updateTripSuccess(updatedTrip)));
      });
    });
  });

  describe('.deleteTrip', function () {
    let iterator = null;
    beforeEach(function () {
      const { personId, trip: { id } } = setup();
      iterator = deleteTrip(tripActions.deleteTrip(personId, id));
    });

    it('will call the API', function () {
      const { personId, trip: { id } } = setup();
      const url = `people/${personId}/trips/${id}`;
      expect(iterator.next().value).to.eql(network.delete(url));
    });

    context('when an error is raised', function () {
      it('will put deleteTripFail', function () {
        const { error, deleteTripFail } = setup();
        iterator.next();
        const result = iterator.throw(error);
        expect(result.value).to.eql(put(deleteTripFail(error)));
      });
    });

    context('when network request succeeds', function () {
      it('will put remove', function () {
        const { remove, trip: { id } } = setup();
        iterator.next();
        expect(iterator.next().value).to.eql(put(remove(id)));
      });

      it('will put deleteTripSuccess', function () {
        const { deleteTripSuccess } = setup();
        iterator.next();
        iterator.next();
        expect(iterator.next().value).to.eql(put(deleteTripSuccess()));
      });
    });
  });
});
