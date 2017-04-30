/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 */
import { AsyncStorage } from 'react-native';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { authReducer } from './auth';
import { tripReducer } from './trip';
import sagas from './sagas';

const reducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  trip: tripReducer,
});

const persistorOptions = {
  storage: AsyncStorage,
  whitelist: ['auth', 'people', 'trip'],
};

/**
 * Bootstraps redux by creating a new store.
 *
 * @return {object} freshly minted redux store.
 */
const bootstrapRedux = () => {
  // Prepare redux middlewares.
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  // Prepare redux enhancers.
  const middlewares = applyMiddleware(sagaMiddleware, logger);
  const hydrator = autoRehydrate();

  // Create the store.
  const store = createStore(reducer, undefined, compose(middlewares, hydrator));

  // Periodically persist the store.
  persistStore(store, persistorOptions);

  // Start running our sagas.
  sagaMiddleware.run(sagas);

  return store;
};

export { bootstrapRedux };
