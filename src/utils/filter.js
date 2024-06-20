import { FilterType } from '../const';
import { isFutureEvent, isPresentEvent, isPastEvent } from './event';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event.dateTo)),
};

export { filter };
