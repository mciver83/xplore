/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { __, gt, map } from 'ramda';

import { createEntitySelectors } from '../../../../app/reducers/shared/entity';

const takeAttributes = model => (model && model.attributes) || model;

const setup = () => {
  const trip1 = { id: 1, attributes: { title: 'SPRING BREAK!', location: 30 } };
  const trip2 = { id: 2, attributes: { title: 'Crocodile hunting', location: 420 } };
  const trips = [trip1, trip2];
  const tripSlice = {
    byId: {
      [trip1.id]: trip1,
      [trip2.id]: trip2,
    },

    ids: [trip1.id, trip2.id],
  };

  const user1 = { id: 1, attributes: { email: 'john.doe@aol.com' } };
  const user2 = { id: 2, attributes: { email: 'charlie@example.com' } };
  const userSlice = {
    byId: {
      [user1]: user1,
      [user2]: user2,
    },

    ids: [user1.id, user2.id],
  };

  const state = { trip: tripSlice, user: userSlice };

  return { trips, state };
};

describe('createEntitySelectors', function () {
  it('returns a collection of seletors', function () {
    expect(createEntitySelectors('trip')).to.have.contain.keys([
      'getById',
      'getIds',
      'getEntities',
      'where',
    ]);
  });

  context('when given the slice key "trip"', function () {
    beforeEach(function () {
      this.selectors = createEntitySelectors('trip');
    });

    describe('.getById', function () {
      it('returns the collection of trips indexed by their id', function () {
        const { state } = setup();

        expect(this.selectors.getById(state)).to.eql(state.trip.byId);
      });
    });

    describe('.getIds', function () {
      it('returns an array of ordered ids', function () {
        const { state } = setup();

        expect(this.selectors.getIds(state)).to.eql(state.trip.ids);
      });
    });

    describe('.getEntities', function () {
      it('returns an ordered array of entities', function () {
        const { trips, state } = setup();

        expect(this.selectors.getEntities(state)).to.eql(map(takeAttributes, trips));
      });
    });

    describe('.where', function () {
      context('when given a simple predicate', function () {
        it('returns a filtered collection', function () {
          const { trips, state } = setup();
          const first = takeAttributes(trips[0]);
          const { title } = first;

          expect(this.selectors.where({ title })(state)).to.eql([first]);
        });
      });

      context('when given a predicate with functions', function () {
        it('returns a filtered collection', function () {
          const { trips, state } = setup();
          const second = takeAttributes(trips[1]);
          const { location } = second;

          expect(this.selectors.where({ location: gt(__, location - 30) })(state)).to.eql([second]);
        });
      });
    });
  });
});
