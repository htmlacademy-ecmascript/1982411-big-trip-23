import { FILTER_TYPE } from '../const';
import { isFutureEvent, isPresentEvent, isPastEvent } from './event';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (tasks) => tasks,
  [FILTER_TYPE.FUTURE]: (tasks) => tasks.filter((task) => isFutureEvent(task.dateFrom)),
  [FILTER_TYPE.PRESENT]: (tasks) => tasks.filter((task) => isPresentEvent(task.dateFrom, task.dateTo)),
  [FILTER_TYPE.PAST]: (tasks) => tasks.filter((task) => isPastEvent(task.dateTo)),
};

export { filter };
