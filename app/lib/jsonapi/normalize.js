/**
 * Copyright (c) 2017-present, Fashionphile, LLC.
 * All rights reserved.
 *
 * @module app/lib/reduxUtils
 */
import {
  camelCase,
  get,
  has,
  isArray,
  isEmpty,
  isNil,
  isPlainObject,
  isString,
  map,
  reduce,
  some,
} from 'lodash';

const typeAsString = value => Object.prototype.toString.call(value);

const hasSomeKeys = (subject, keys) => some(keys, key => has(subject, key));

const isEmptyDocument = jsonDocument => (
  isNil(jsonDocument) || (isPlainObject(jsonDocument) && isEmpty(jsonDocument)));

/**
 * Pushes `resourceObject` into an array keyed by its type. If the key is missing on `target` then
 * it is added.
 *
 * @param {object} target :: object that will be assigned to.
 * @param {object} resourceObject :: JSON API resource object.
 * @return {object} updated target.
 * @example
 *
 * ```js
 * const picture = { id: 1, type: 'pictures', attributes: { source: 'abc.jpeg' } };
 * assignAndNormalizeInclude({}, picture) // => { pictures: [{ id: 1, source: 'abc.jpeg' }] };
 * ```
 */
function assignAndNormalizeInclude(target, resourceObject) {
  const normalizedType = camelCase(resourceObject.type);
  const current = get(target, normalizedType, []);

  return {
    ...target,
    [normalizedType]: current.concat(normalizeResourceObject(resourceObject)),
  };
}

/**
 * Assigns `key` to `target` so it points to the id(s) extracted from `relationObject`.
 *
 * @param {object} target :: object that will be assigned to.
 * @param {object} relationObject :: JSON API Relation object.
 * @param {string} key :: the JSON API key of this relation.
 * @return {object} updated target.
 * @example
 *
 * ```js
 * const picture = { data: { type: 'pictures', id: 1 } };
 * assignRelation({}, picture, 'picture') // => { picture: 1 };
 *
 * const relationObject2 = { data: [{ type: 'comments', id: 1}, { type: 'comments', id: 2 }] };
 * assignRelation({}, comments, 'comments') // => { comments: [1, 2] };
 * ```
 */
function assignRelation(target, relationObject, key) {
  const getId = obj => get(obj, 'id');
  const normalizedData = isArray(relationObject.data)
    ? map(relationObject.data, getId)
    : getId(relationObject.data);

  return { ...target, [key]: normalizedData };
}

/**
 * Transforms a JSON API relationships object to a simple object of keys which point to related
 * id(s).
 *
 * @param {object} relationshipsObject :: JSON API relationships object.
 * @return {object} simple hash to be merged with the attributes of a resource object.
 * @example
 *
 * ```js
 * const relationships = {
 *   pictures: {
 *     data: [{ type: 'pictures', id: 1 }, { type: 'pictures', id: 2 }]
 *   },
 *   author: {
 *     data: { type: 'users', id: 3 },
 *   }
 * };
 *
 * normalizeRelationshipsObject(relationships) // => { pictures: [1, 2], author: 3 }
 * normalizeRelationshipsObject({}) // => {}
 * ```
 */
function normalizeRelationshipsObject(relationshipsObject) {
  if (isNil(relationshipsObject)) {
    return {};
  } else if (!isPlainObject(relationshipsObject)) {
    throw new Error(`Expected plain object, but got "${typeAsString(relationshipsObject)}"`);
  }

  return reduce(relationshipsObject, assignRelation, {});
}

/**
 * Transforms a ResourceObject--as defined by the JSON API specification--to a simple/flat object.
 *
 * @param {object} resourceObject :: JSON API resource object.
 * @return {object} simple object to be used in the app's redux store.
 * @example
 *
 * ```js
 * const user = {
 *   id: '1',
 *   type: 'users',
 *   attributes: { email: 'user@example.com' },
 *   relationships: {
 *     wishlist: {
 *       data: [{ type: 'wishlistItems', id: 1 }, { type: 'wishlistItems', id: 2 }],
 *     },
 *   },
 * };
 *
 * normalizeResourceObject(user) // => { id: '1', email: 'user@example.com', wishlist: [1, 2] };
 * ```
 */
function normalizeResourceObject(resourceObject) {
  if (isNil(resourceObject)) {
    return resourceObject;
  } else if (!isPlainObject(resourceObject)) {
    throw new Error(`Expected plain object, but got "${typeAsString(resourceObject)}"`);
  } else if (!isString(resourceObject.type)) {
    throw new Error('ResourceObject must include a string value for the attribute `type`');
  }

  return {
    ...get(resourceObject, 'attributes', {}),
    ...normalizeRelationshipsObject(resourceObject.relationships),
    id: resourceObject.id,
  };
}

/**
 * Transforms a top level JSON API document into a simple object.
 *
 * When `jsonApiDocument` is nil or empty, it returns an empty object instead of throwing an error.
 *
 * @param {object} jsonApiDocument :: top level JSON API document.
 * @return {object} simple object which can be split and dispatched to redux.
 * @example
 *
 * ```js
 * const doc = {
 *   data: {
 *     id: 1,
 *     type: 'people',
 *     attributes: { name: 'foo' },
 *     relationships: {
 *       picture: { data: { id: 1, type: 'pictures' } },
 *     },
 *   },
 *
 *   included: [{ id: 1, type: 'pictures', attributes: { source: 'here.jpeg' } }],
 * };
 *
 * const result = normalize(doc);
 * const expected = {
 *   data: { id: 1, name: 'foo', picture: 1 },
 *   included: { pictures: [{ id: 1, source: 'here.jpeg' }] }
 * };
 * ```
 */
function normalize(jsonApiDocument) {
  if (isEmptyDocument(jsonApiDocument)) {
    return {};
  }

  if (!isPlainObject(jsonApiDocument)) {
    throw new Error(`Expected plain object, but got "${typeAsString(jsonApiDocument)}"`);
  } else if (!hasSomeKeys(jsonApiDocument, ['data', 'errors', 'meta'])) {
    throw new Error('JSONApiDocument must include either "data", "error", or "meta"');
  }

  const rawData = jsonApiDocument.data;

  return {
    data: isArray(rawData)
      ? map(rawData, normalizeResourceObject)
      : normalizeResourceObject(rawData),
    included: reduce(jsonApiDocument.included, assignAndNormalizeInclude, {}),
    meta: get(jsonApiDocument, 'meta', {}),
    links: get(jsonApiDocument, 'links', {}),
    jsonapi: get(jsonApiDocument, 'jsonapidocument', {}),
    errors: get(jsonApiDocument, 'errors'),
  };
}

export {
  normalize as default,

  // These are exported for testing purposes, but should probably not be used.
  normalizeRelationshipsObject,
  normalizeResourceObject,
};
