import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';

import { Strong, Text } from '../common';

// Setup styled helper components.
const Label = styled(Strong)`margin-bottom: 5;`;
const ErrorLabel = styled(Label)`color: #e74c3c;`;
const FieldGroupContainer = styled.View`margin-bottom: 10;`;
const ErrorText = styled(Text)`margin-top: 5; color: #e74c3c;`;

class FieldGroup extends Component {
  get hasError() {
    return this.props.meta && this.props.meta.error;
  }

  render() {
    const { component, label, labelStyle, ...restOfProps } = this.props;
    const ComponentClassOrFun = component;

    return (
      <FieldGroupContainer>
        {this.hasError
          ? <ErrorLabel style={labelStyle}>{label}</ErrorLabel>
          : <Label style={labelStyle}>{label}</Label>}
        <ComponentClassOrFun {...restOfProps} />
        {this.hasError && <ErrorText>{this.props.meta.error}</ErrorText>}
      </FieldGroupContainer>
    );
  }
}

FieldGroup.propTypes = {
  label: PropTypes.string,
  labelStyle: View.propTypes.style,

  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
};

// eslint-disable-next-line react/display-name
const FieldGroupWith = InputClassOrFun => props => (
  <FieldGroup component={InputClassOrFun} {...props} />
);

export { FieldGroup as default, FieldGroupWith };
