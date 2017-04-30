/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { map } from 'ramda';

const { freeze } = Object;

const BaseActions = freeze({
  // Collection Actions
  SET: 'SET',
  MERGE: 'MERGE',
  CLEAR: 'CLEAR',

  // Model Actions
  UPSERT: 'UPSERT',
  REMOVE: 'REMOVE',
});

/**
 * @private
 * @param {string} prefix :: constant prefix; e.g. 'TRIP'.
 * @param {string} key :: base constant; e.g. 'MERGE'.
 * @return {array} key/value pair.
 */
const asPrefixedPair = prefix => key => `${prefix}_${key}`;

/**
 * Creates common entity action constants which can be merged with other constants.
 *
 * @param {string} prefix :: constant prefix; e.g. 'TRIP'.
 * @return {object} collection of entity action constants.
 * @example
 * ```js
 * const TripActionConsts = {
 *   ...createEntityActionConstants('TRIP'),
 *   CREATE_TRIP: 'CREATE_TRIP',
 * };
 * ```
 */
const createEntityActionConstants = prefix => map(asPrefixedPair(prefix), BaseActions);

export { createEntityActionConstants as default };
