/**
 * Copyright (c) 2017-present, Objective Inc.
 * All rights reserved.
 *
 * @module app/components/auth
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';

import { Field } from 'redux-form';

import { Centered, Content, Header, Link, PrimaryButton } from '../common';
import { FieldGroupWith, TextInput } from '../form';

const TextInputFieldGroup = FieldGroupWith(TextInput);

class LoginForm extends Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Header title="Login" history={{}} />
        <Content>
          <Field
            component={TextInputFieldGroup}
            name="email"
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!this.props.isFetching}
          />

          <Field
            component={TextInputFieldGroup}
            name="password"
            label="Password"
            autoCapitalize="none"
            editable={!this.props.isFetching}
            secureTextEntry
          />
        </Content>
        <Centered>
          <PrimaryButton
            text={this.props.isFetching ? 'Loading...' : 'Login'}
            disabled={this.props.isFetching}
            onPress={this.props.onSubmit}
          />
          <Link text="Forgot your password?" disabled={this.props.isFetching} />
        </Centered>
      </ScrollView>
    );
  }
}

LoginForm.propTypes = {
  // Callback which is fired when the user is ready to submit the login form.
  onSubmit: PropTypes.func.isRequired,

  // A value which indicates whether there is an active network request.
  isFetching: PropTypes.bool.isRequired,
};

export { LoginForm as default };
