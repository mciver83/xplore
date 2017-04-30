/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { createEntityActionCreators } from '../../../../app/reducers/shared/entity';

const setup = () => {
  const model = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.org' };
  const collection = [model];
  const meta = { total: 345 };

  return { collection, meta, model };
};

describe('.createEntityActionCreators', function () {
  beforeEach(function () {
    this.actionCreators = createEntityActionCreators('TRIP');
  });

  it('has the action creator `set`', function () {
    const { collection } = setup();

    expect(this.actionCreators.set(collection)).to.eql({
      type: 'TRIP_SET',
      payload: { collection, meta: undefined },
    });
  });

  it('has the action creator `merge`', function () {
    const { collection, meta } = setup();

    expect(this.actionCreators.merge(collection, meta)).to.eql({
      type: 'TRIP_MERGE',
      payload: { collection, meta },
    });
  });

  it('has the action creator `clear`', function () {
    expect(this.actionCreators.clear()).to.eql({
      type: 'TRIP_CLEAR',
      payload: { meta: undefined },
    });
  });

  it('has the action creator `upsert`', function () {
    const { model } = setup();

    expect(this.actionCreators.upsert(model.id, model)).to.eql({
      type: 'TRIP_UPSERT',
      payload: { id: model.id, attributes: model, meta: undefined },
    });
  });

  it('has the action creator `remove`', function () {
    const { model } = setup();

    expect(this.actionCreators.remove(model.id)).to.eql({
      type: 'TRIP_REMOVE',
      payload: { id: model.id, meta: undefined },
    });
  });
});
