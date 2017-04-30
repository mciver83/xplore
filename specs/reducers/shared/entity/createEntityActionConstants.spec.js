/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { createEntityActionConstants } from '../../../../app/reducers/shared/entity';

describe('.createEntityActionConstants', function () {
  it('returns a collection of common entity actions', function () {
    expect(createEntityActionConstants('TRIP')).to.eql({
      SET: 'TRIP_SET',
      MERGE: 'TRIP_MERGE',
      CLEAR: 'TRIP_CLEAR',

      // Model Actions
      UPSERT: 'TRIP_UPSERT',
      REMOVE: 'TRIP_REMOVE',
    });
  });
});
