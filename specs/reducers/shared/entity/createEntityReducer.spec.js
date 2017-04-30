/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { equals, fromPairs, map, omit, reject } from 'ramda';

import { createEntityReducer } from '../../../../app/reducers/shared/entity';

/**
 * @param {array} collection :: flat array of models.
 * @returns {object} collection of models indexed by their id.
 */
const asCollectionById = collection => fromPairs(map(model => [model.id, model], collection));

/**
 * @param {array} collection :: flat array of models.
 * @returns {array} array of model ids.
 */
const asIds = collection => map(model => model.id, collection);

/**
 * Sets up mock data for use in our specs.
 *
 * @returns {object} mock data.
 */
const setup = () => {
  const trip1 = { id: 1, title: 'I WANT VACATION!!!!', createdAt: Date.now() };
  const trip2 = { id: 2, title: 'GIVE ME A PIECE OF THAT TRIP', createdAt: Date.now() };
  const trip3 = { id: 3, title: 'GIVE ME MORE TRIP', createdAt: Date.now() };

  const baseById = { [trip1.id]: trip1, [trip2.id]: trip2 };
  const baseIds = [trip1.id, trip2.id];

  const baseCollection = [trip1, trip2];
  const newCollection = [trip1, trip2, trip3];

  const model = trip1;
  const updatedModel = { ...model, title: 'I MEANT I REALLY WANT VACATION!!!!' };
  const newModel = trip3;

  return { baseById, baseIds, baseCollection, newCollection, model, updatedModel, newModel };
};

describe('createEntityReducer', function () {
  beforeEach(function () {
    this.createReducer = createEntityReducer('TRIP');
    this.reducer = this.createReducer(state => state);
  });

  context('when given a reducer that is not a function', function () {
    it('throws an error', function () {
      expect(() => this.createReducer()).to.throw(Error);
      expect(() => this.createReducer('NOT A FUNCTION')).to.throw(Error);
      expect(() => this.createReducer(() => {})).to.not.throw;
    });
  });

  context('when given a reducer that is a function', function () {
    it('always calls the wrapped reducer', function () {
      const truthyReducer = (...rest) => rest.length === 2;
      const wrappedReducer = this.createReducer(truthyReducer);
      const invalidAction = { type: 'INVALID_ACTION' };
      const validAction = { type: 'TRIP_CLEAR', payload: {} };

      expect(wrappedReducer({ byId: {}, ids: [] }, invalidAction)).to.be.true;
      expect(wrappedReducer({ byId: {}, ids: [] }, validAction)).to.be.true;
    });
  });

  context('when invoked with an action type of "SET"', function () {
    it('replaces the current collection with the incoming collection', function () {
      const { baseById, baseIds, newCollection } = setup();
      const state = { byId: baseById, ids: baseIds };
      const action = {
        type: 'TRIP_SET',
        payload: { collection: newCollection },
      };

      expect(this.reducer(state, action)).to.eql({
        byId: asCollectionById(newCollection),
        ids: asIds(newCollection),
      });
    });
  });

  context('when invoked with an action type of "MERGE"', function () {
    it('merges the incoming collection into the current collection', function () {
      const { baseById, baseIds, newModel } = setup();
      const state = { byId: baseById, ids: baseIds };
      const action = {
        type: 'TRIP_MERGE',
        payload: { collection: [newModel] },
      };

      expect(this.reducer(state, action)).to.eql({
        byId: { ...baseById, [newModel.id]: newModel },
        ids: baseIds.concat(newModel.id),
      });
    });
  });

  context('when invoked with an action type of "CLEAR"', function () {
    it('empties the current collection', function () {
      const { baseById, baseIds } = setup();
      const state = { byId: baseById, ids: baseIds };
      const action = { type: 'TRIP_CLEAR', payload: {} };

      expect(this.reducer(state, action)).to.eql({
        byId: {},
        ids: [],
      });
    });
  });

  context('when invoked with an action type of "UPSERT"', function () {
    context('and the incoming model is missing', function () {
      it('adds the new model', function () {
        const { baseById, baseIds, newModel } = setup();
        const state = { byId: baseById, ids: baseIds };
        const action = {
          type: 'TRIP_UPSERT',
          payload: { id: newModel.id, attributes: newModel },
        };

        expect(this.reducer(state, action)).to.eql({
          byId: { ...baseById, [newModel.id]: newModel },
          ids: baseIds.concat(newModel.id),
        });
      });
    });

    context('and the incoming model already exists', function () {
      it('updates the model', function () {
        const { baseById, baseIds, updatedModel } = setup();
        const state = { byId: baseById, ids: baseIds };
        const action = {
          type: 'TRIP_UPSERT',
          payload: { id: updatedModel.id, attributes: updatedModel },
        };

        expect(this.reducer(state, action)).to.eql({
          byId: { ...baseById, [updatedModel.id]: updatedModel },
          ids: baseIds,
        });
      });
    });
  });

  context('when invoked with an action type of "REMOVE"', function () {
    it('removes the model from the collections', function () {
      const { baseById, baseIds, model } = setup();
      const state = { byId: baseById, ids: baseIds };
      const action = {
        type: 'TRIP_REMOVE',
        payload: { id: model.id },
      };

      expect(this.reducer(state, action)).to.eql({
        byId: omit([model.id], baseById),
        ids: reject(equals(model.id), baseIds),
      });
    });
  });
});
