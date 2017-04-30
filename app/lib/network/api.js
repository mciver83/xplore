import { Platform } from 'react-native';

import axios from 'axios';

const { freeze } = Object;

const defaultConfig = freeze({

  ...Platform.select({
    ios: {
      // Base URL.
      baseURL: 'http://localhost:3000/api/mobile/',

      // Not used by axios directly. Instead set `baseURL = defaultConfig.authURL`.
      authURL: 'http://localhost:3000/api/auth',
    },

    android: {
      // Base URL.
      baseURL: 'http://192.168.1.160:3000/api/mobile/',

      // Not used by axios directly. Instead set `baseURL = defaultConfig.authURL`.
      authURL: 'http://192.168.1.160:3000/api/auth',
    },
  }),

  // Custom headers appended to each requeest.
  headers: freeze({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),

  // Specify how long until a request is considered timed out, and aborted.
  timeout: 10000, // 10s
});

const api = axios.create(defaultConfig);

// In development we'll log the HTTP request/response cycle.
if (typeof __DEV__ !== 'undefined' && __DEV__ && console) {
  const { group, groupEnd, log } = console;

  api.interceptors.request.use((request) => {
    group();
    log(`START (${request.url} | ${request.method})`, request);
    return request;
  }, (error) => {
    log('ERROR (REQUEST)', error);
    groupEnd();
    throw (error);
  });

  api.interceptors.response.use((response) => {
    log(`FINISH (${response.url} | ${response.method}`, response);
    groupEnd();
    return response;
  }, (error) => {
    log('ERROR (RESPONSE)', error);
    groupEnd();
    throw (error);
  });
}

export { api as default, defaultConfig };
