/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import createEntityActionConstants from './createEntityActionConstants';

const { freeze } = Object;

/**
 * Creates a collection of redux action creators.
 *
 * Each action type is prefixed with the value of `prefix`. This is done to ensure that the action
 * only causes changes to its state slice.
 *
 * @param {string} prefix :: action prefix;
 * @return {object} collection of action creators.
 */
const createEntityActionCreators = (prefix) => {
  const ActionConstants = createEntityActionConstants(prefix);

  return freeze({
    set(collection, meta) {
      return {
        type: ActionConstants.SET,
        payload: { collection, meta },
      };
    },

    merge(collection, meta) {
      return {
        type: ActionConstants.MERGE,
        payload: { collection, meta },
      };
    },

    clear(meta) {
      return {
        type: ActionConstants.CLEAR,
        payload: { meta },
      };
    },

    upsert(id, attributes, meta) {
      return {
        type: ActionConstants.UPSERT,
        payload: { id, attributes, meta },
      };
    },

    remove(id, meta) {
      return {
        type: ActionConstants.REMOVE,
        payload: { id, meta },
      };
    },
  });
};

export { createEntityActionCreators as default };
