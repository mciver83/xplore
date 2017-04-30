import React, { Component, PropTypes } from 'react';
import { Platform, TextInput as RNTextInput, View } from 'react-native';

import { keys, omit, pick } from 'ramda';

const ProtectedKeys = [
  'onChangeText',
  'onChange',
  'onFocus',
  'onBlur',
  'value',
];

const AllowedKeys = keys(omit(ProtectedKeys, RNTextInput.propTypes));

import styled from 'styled-components/native';

const Input = styled.TextInput`
  color: #333;
  font-family: Open Sans;
  font-size: 16;
  line-height: 18;
  height: ${Platform.select({ ios: 22, android: 44 })};
`;

const InputWrapper = styled.View`
  border-color: #d5d5d5;
  border-radius: 2;
  border-width: 0.5;
  padding-horizontal: 10;
  padding-vertical: ${Platform.select({ android: 0, ios: 10 })};
`;

const ErrorWrapper = styled(InputWrapper)`border-color: #e74c3c;`;
const FocusedWrapper = styled(InputWrapper)`border-color: #1999DB;`;

class TextInput extends Component {
  render() {
    const input = this.props.input || {};
    const meta = this.props.meta || {};
    const { wrapperStyle, ...restOfProps } = this.props;
    let Wrapper = meta.error ? ErrorWrapper : InputWrapper;
    Wrapper = meta.active ? FocusedWrapper : Wrapper;

    return (
      <Wrapper style={wrapperStyle}>
        <Input
          underlineColorAndroid="transparent"
          onChangeText={input.onChange}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          value={input.value}
          {...pick(AllowedKeys, input)}
          {...pick(AllowedKeys, restOfProps)}
        />
      </Wrapper>
    );
  }
}

TextInput.propTypes = {
  wrapperStyle: View.propTypes.style,
  input: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    active: PropTypes.bool,
  }),
};

export { TextInput as default };
