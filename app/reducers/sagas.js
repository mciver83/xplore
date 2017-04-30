/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { fork } from 'redux-saga/effects';

import { authSaga } from './auth';
import { tripSaga } from './trip';

function* sagas() {
  yield* [
    fork(authSaga),
    fork(tripSaga),
  ];
}

export { sagas as default };
