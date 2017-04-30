import React, { Component, PropTypes } from 'react';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';

import moment from 'moment';

import DatePickerWrapper from './DatePickerWrapper';
import { formatDate } from '../../../lib/dateTime';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.props.input.onChange(formatDate(date));
  }

  onPress() {
    return this.props.mode === 'time' ? this.openTimePickerAndroid() : this.openDatePickerAndroid();
  }

  setValue() {
    const date = moment(this.props.input.value.date);
    return this.props.mode === 'time' ? date.format('LT') : date.format('ll');
  }

  openDatePickerAndroid() {
    DatePickerAndroid.open({ date: this.props.input.value.date })
    .then(({ action, year, month, day }) => {
      if (action === DatePickerAndroid.dismissedAction) { return null; }
      const date = new Date(year, month, day);
      return this.onDateChange(date);
    });
  }

  openTimePickerAndroid() {
    const hour = this.props.input.value.hour;
    const minute = this.props.input.value.minute;
    const is24Hour = false;
    TimePickerAndroid.open({ hour, minute, is24Hour })
      .then((res) => {
        if (res.action === TimePickerAndroid.dismissedAction) { return null; }
        const date = new Date();
        date.setHours(res.hour, res.minute);
        return this.onDateChange(date);
      });
  }

  render() {
    return (
      <DatePickerWrapper
        label={this.props.datePickerLabel}
        value={this.setValue()}
        onPress={this.onPress}
      />
    );
  }
}

DatePicker.propTypes = {
  mode: PropTypes.string,
  datePickerLabel: PropTypes.string,
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
