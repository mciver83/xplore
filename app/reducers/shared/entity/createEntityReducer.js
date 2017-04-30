/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { fromPairs, indexOf, map, omit, uniq, without } from 'ramda';

import createEntityActionConstants from './createEntityActionConstants';

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
 * Sets the collection values using the incoming collection.
 *
 * @private
 * @param {object} state :: current redux state slice.
 * @param {array} collection :: incoming collection of models.
 * @return {object} updated state slice.
 */
const set = (state, collection) => ({
  ...state,
  byId: asCollectionById(collection),
  ids: asIds(collection),
});

/**
 * Merges the collection of values into the incoming collection.
 *
 * When an entity is already in the collection, it is updated. When an entity is missing it is
 * appended.
 *
 * @private
 * @param {object} state :: current redux state slice.
 * @param {array} collection :: incoming collection of models.
 * @return {object} updated state slice.
 */
const merge = (state, collection) => ({
  ...state,
  byId: {
    ...(state.byId || {}),
    ...asCollectionById(collection),
  },
  ids: uniq((state.ids || []).concat(asIds(collection))),
});

/**
 * Clears the collection of entities.
 *
 * @private
 * @param {object} state :: current redux state slice.
 * @return {object} updated state slice.
 */
const clear = state => ({
  ...state,
  byId: {},
  ids: [],
});

/**
 * Updates the entity with the given `id`; if the entity is missing it is appended.
 *
 * @private
 * @param {object} state :: current redux state slice.
 * @param {any} id :: entity id.
 * @param {object} attrivutes :: entity attributes.
 * @return {object} updated state slice.
 */
const upsert = (state, id, attributes) => ({
  ...state,
  byId: {
    ...(state.byId || {}),
    [id]: attributes,
  },
  ids: indexOf(id, state.ids) > -1 ? state.ids : (state.ids || []).concat(id),
});

/**
 * Removes the entity with the given `id`.
 *
 * @private
 * @param {object} state :: current redux state slice.
 * @param {any} id :: entity id.
 * @return {object} updated state slice.
 */
const remove = (state, id) => ({
  ...state,
  byId: omit(id, state.byId),
  ids: without([id], state.ids),
});

/**
 * Prepares a higher order reducer.
 *
 * @return {function} wrapped reducer.
 */
const createEntityReducer = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  /**
   * Wraps the reducer to handle basic entity collection actions.
   *
   * @param {function} reducerFun :: reducer function to be wrapped.
   * @return {function} wrapped reducer function.
   */
  return (reducerFun) => {
    if (Object.prototype.toString.call(reducerFun) !== '[object Function]') {
      throw new Error('`createEntityReducer` requires a function');
    }

    /**
     * Updates the redux state slice based on the current action.
     *
     * This will always forward the state and the action to the wrapped reducer. When the reducer
     * can handle the action it will forward the updated state and action to the wrapped reducer.
     *
     * @param {object} state :: redux state slice.
     * @param {object} action :: redux action.
     * @return {object} updated redux state slice.
     */
    return (state, action) => {
      const payload = action.payload || {};

      switch (action.type) {
        case ActionConstants.SET:
          return reducerFun(set(state, payload.collection), action);

        case ActionConstants.MERGE:
          return reducerFun(merge(state, payload.collection), action);

        case ActionConstants.CLEAR:
          return reducerFun(clear(state), action);

        case ActionConstants.UPSERT:
          return reducerFun(upsert(state, payload.id, payload.attributes), action);

        case ActionConstants.REMOVE:
          return reducerFun(remove(state, payload.id), action);

        default:
          return reducerFun(state, action);
      }
    };
  };
};

export { createEntityReducer as default };
