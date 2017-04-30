import React, { Component, PropTypes } from 'react';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { is, pickBy } from 'ramda';
import { Redirect } from 'react-router-native';
import { reduxForm } from 'redux-form';

import { authActions, authSelectors } from '../../reducers/auth';
import { LoginForm } from '../../components/auth';

class InternalContainer extends Component {
  constructor(props) {
    super(props);

    this.login = values => this.props.actions.login(values);
    this.onSubmit = () => this.props.handleSubmit(this.login)();
  }

  render() {
    return this.props.isAuthenticated
      ? <Redirect to={this.props.redirect} />
      : <LoginForm onSubmit={this.onSubmit} isFetching={this.props.isFetching} />;
  }
}

InternalContainer.propTypes = {
  // Collection of action creators; dispatches the redux-action on invocation.
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,

  // A value which indicates whether there is an active "auth" network request.
  isFetching: PropTypes.bool.isRequired,

  // A value which indicates whether the user is authenticated.
  isAuthenticated: PropTypes.bool.isRequired,

  // Wrapper function provided by redux-form; expects your submit handler as its input.
  handleSubmit: PropTypes.func.isRequired,

  // Optional override for redirecting the user once authenticated.
  redirect: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

InternalContainer.defaultProps = {
  redirect: '/',
};

const actions = pickBy(is(Function), authActions);
const mapStateToProps = state => ({
  isFetching: authSelectors.isFetching(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'login' }));

const LoginContainer = enhance(InternalContainer);

export { LoginContainer as default };
