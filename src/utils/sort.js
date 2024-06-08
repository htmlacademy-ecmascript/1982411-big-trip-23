import dayjs from 'dayjs';

function sortByDate(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
}

function sortByTime(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(a.dateTo)) - dayjs(b.dateFrom).diff(dayjs(b.dateTo));
}

function sortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

export { sortByDate, sortByTime, sortByPrice };
