/**
 * Copyright (c) 2017-present, Objective, Inc.
 * All rights reserved.
 *
 * Sets up the global/mocha environment before running the actual specs.
 *
 * - Setup Babel so our specs can use ES6/JSX.
 * - Setup ReactNative Mock so our component specs do not require a host device.
 *     - For example a host device may be an iPhone.
 * - Assign common testing methods to `global`.
 */
require('babel-polyfill');
require('babel-register')({
  extensions: ['.js', '.jsx', '.ios.js', 'es6', '.es'],
});
require('react-native-mock/mock');

const { shallow } = require('enzyme');
const chai = require('chai');
const React = require('react');

// Setup common global mocks.
global.document = {};
global.window = {};

// Assign common testing functions to `global`.
global.expect = chai.expect;
global.shallow = shallow;
global.React = React;
