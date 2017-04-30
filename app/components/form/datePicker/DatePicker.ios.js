import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, View } from 'react-native';

import moment from 'moment';

import DatePickerWrapper from './DatePickerWrapper';
import { formatDate } from '../../../lib/dateTime';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);

    this.state = {
      isVisible: false,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onPress() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  onDateChange(date) {
    this.props.input.onChange(formatDate(date));
  }

  setValue() {
    const date = moment(this.props.input.value.date);
    return this.props.mode === 'time' ? date.format('LT') : date.format('ll');
  }

  render() {
    return (
      <View>
        <DatePickerWrapper
          label={this.props.datePickerLabel}
          value={this.setValue()}
          onPress={this.onPress}
        />
        {this.state.isVisible &&
          <DatePickerIOS
            {...this.props}
            onDateChange={this.onDateChange}
            date={this.props.input.value.date}
          />}
      </View>
    );
  }
}

DatePicker.propTypes = {
  mode: PropTypes.string.isRequired,
  datePickerLabel: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      hour: PropTypes.number.isRequired,
      minute: PropTypes.number.isRequired,
    }),
  }),
};

export { DatePicker as default };
