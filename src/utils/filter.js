import { filterType } from '../const';
import { isFutureEvent, isPresentEvent, isPastEvent } from './event';

const filter = {
  [filterType.EVERYTHING]: (tasks) => tasks,
  [filterType.FUTURE]: (tasks) => tasks.filter((task) => isFutureEvent(task.dateFrom)),
  [filterType.PRESENT]: (tasks) => tasks.filter((task) => isPresentEvent(task.dateFrom, task.dateTo)),
  [filterType.PAST]: (tasks) => tasks.filter((task) => isPastEvent(task.dateTo)),
};

export { filter };
