import dayjs from 'dayjs';

function sortByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortByTime(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) - dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo));
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

export { sortByDate, sortByTime, sortByPrice };
