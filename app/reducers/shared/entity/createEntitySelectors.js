/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { createSelector, defaultMemoize } from 'reselect';
import { equals, filter, isNil, map, path, pathSatisfies, where } from 'ramda';

const get = (valuePath, obj, defaultValue = null) => (
  pathSatisfies(isNil, valuePath, obj)
    ? defaultValue
    : path(valuePath, obj));

const asPredicate = value => (
  Object.prototype.toString.call(value) === '[object Function]'
    ? value
    : equals(value));

const createTestObject = conditions => map(asPredicate, conditions);

/**
 * Creates a collection of selectors scoped to the `sliceKey`.
 *
 * @param {string} sliceKey :: redux state slice key.
 * @return {object} collection of selectors.
 */
const createEntitySelectors = (sliceKey) => {
  /**
   * @return {object} collection of entities indexed by their id.
   */
  const getById = defaultMemoize(state => get([sliceKey, 'byId'], state, {}));

  /**
   * @return {array} ordered array of entity ids.
   */
  const getIds = defaultMemoize(state => get([sliceKey, 'ids'], state, []));

  /**
   * @return {array} collection of ordered entities.
   */
  // const getEntities = createSelector(
  //   getById,
  //   getIds,
  //   (collection, order) => map(id => path([id, 'attributes'], collection), order));
  const getEntities = createSelector(
    getById,
    getIds,
    (collection, order) => map(
      id => Object.assign(path([id, 'attributes'], collection), { id }), order));

  /**
   * @return {array} collection of entities matching the given conditions.
   */
  const whereSelector = defaultMemoize((conditions) => {
    const predicate = createTestObject(conditions);

    return createSelector(getEntities, collection => filter(where(predicate), collection));
  });

  return {
    getById,
    getIds,
    getEntities,
    where: whereSelector,
  };
};

export { createEntitySelectors as default };
