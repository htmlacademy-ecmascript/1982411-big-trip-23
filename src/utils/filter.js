import { FilterType } from '../const';
import { isFutureEvent, isPresentEvent, isPastEvent } from './event';

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => isFutureEvent(task.dateFrom)),
  [FilterType.PRESENT]: (tasks) => tasks.filter((task) => isPresentEvent(task.dateFrom, task.dateTo)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isPastEvent(task.dateTo)),
};

export { filter };
