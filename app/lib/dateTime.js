import moment from 'moment';

const formatDate = value => ({
  hour: moment(value).hour(),
  minute: moment(value).minute(),
  date: value,
});

const formatTime = (value) => {
  const timeParts = value.split('.');
  const hour = Number(timeParts[0]);
  const minute = Math.round(Number(`0.${timeParts[1]}`) * 60);
  const date = new Date();
  date.setHours(hour, minute);
  return { hour, minute, date };
};

const parseDate = ({ date }) => date;

const parseTime = ({ hour, minute }) => {
  const fraction = minute === 0 ? 0 : minute / 60;
  const time = hour + fraction;
  return time.toFixed(4);
};

export { formatDate, formatTime, parseDate, parseTime };
