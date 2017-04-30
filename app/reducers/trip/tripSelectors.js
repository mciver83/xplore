import { createEntitySelectors } from '../shared/entity';

const isFetching = state => state.trip.fetching;

const tripSelectors = Object.freeze({
  isFetching,
  ...createEntitySelectors('trip'),
});

export { tripSelectors as default };
