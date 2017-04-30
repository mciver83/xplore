import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';

import { authSelectors } from '../../reducers/auth';

class InternalAuthenticatedComponent extends Component {
  render() {
    const ComponentClass = this.props.component;

    return (
      this.props.isAuthenticated
        ? <ComponentClass {...this.props} />
        : <Redirect to="/auth/login" />
    );
  }
}

InternalAuthenticatedComponent.propTypes = {
  // A value indicating whether the user is logged in.
  isAuthenticated: PropTypes.bool.isRequired,

  // Component which is rendered when the user is signed in.
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

const mapStateToProps = state => ({ isAuthenticated: authSelectors.isAuthenticated(state) });
const enhance = connect(mapStateToProps);
const AuthenticatedComponent = enhance(InternalAuthenticatedComponent);

/* eslint-disable react/display-name */

/**
 * Ensures the current user is authenticated before rendering `ComponentClass`.
 *
 * @param {object} ComponentClass :: component class to be rendered if the user is authenticated.
 * @return {object} react component.
 */
const authenticate = ComponentClass => props => (
  <AuthenticatedComponent {...props} component={ComponentClass} />
);

/* eslint-enable react/display-name */

export { authenticate as default };
