import React, { Component, PropTypes } from 'react';

import styled from 'styled-components/native';

import { Row, Strong, Text } from '../../common';

const SpacedRow = styled(Row)`
  justify-content: space-between;
`;

const TouchableRow = styled.TouchableOpacity`
  padding-vertical: 10;
`;

class DatePickerWrapper extends Component {
  render() {
    return (
      <TouchableRow onPress={this.props.onPress}>
        <SpacedRow>
          <Strong>{this.props.label}</Strong>
          <Text>{this.props.value}</Text>
        </SpacedRow>
      </TouchableRow>
    );
  }
}

DatePickerWrapper.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export { DatePickerWrapper as default };
