import dayjs from 'dayjs';
import {HOURS, MINUTES } from '../const';

function getFormattedEventDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

// Код от Алексей Москвин (https://github.com/hondavod70/2389945-big-trip-23/)
function getEventDurationTime(dateStart, dateEnd) {
  if (dateStart && dateEnd) {
    const diff = dayjs(dateEnd).diff(dateStart, 'minute');
    let days = Math.floor(diff / (MINUTES * HOURS));
    let hours = Math.floor(diff / MINUTES);
    let minutes = Math.floor(diff % MINUTES);
    days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
    hours =
      hours % HOURS === 0 ? '00H' : `${String(hours % HOURS).padStart(2, '0')}H`;
    minutes = `${String(minutes).padStart(2, '0')}M`;

    const durationTime = `${days} ${days !== '' || hours !== '' ? hours : ''} ${minutes}`;
    return durationTime;
  } else {
    return 0;
  }
}

function getTotalEventPrice(price, offers) {
  if (price) {
    if (!offers || offers.length === 0) {
      return price;
    }
    return price + offers.reduce((sum, offer) => sum + offer.price, 0);
  } else {
    return 0;
  }
}

function isFutureEvent(startDate) {
  return dayjs().isAfter(startDate, 'D');
}

function isPresentEvent(startDate, endDate) {
  return (dayjs().isBefore(startDate, 'D') || dayjs().isSame(startDate, 'D')) && (dayjs().isAfter(endDate, 'D') || dayjs().isSame(endDate, 'D'));
}

function isPastEvent(endDate) {
  return dayjs().isBefore(endDate, 'D');
}

function getOffersByEventType(type, allOffers) {
  const offer = allOffers.find((offerItem) => offerItem.type === type);
  return offer.offers;
}

function getSelectedOffers(type, offersIds, allOffers) {
  return getOffersByEventType(type, allOffers).filter(
    (offer) => offersIds.includes(offer.id));
}

function getCityById(id, cities) {
  return cities.find((city) => city.id === id);
}

export {
  getFormattedEventDate,
  getEventDurationTime,
  getTotalEventPrice,
  isFutureEvent,
  isPresentEvent,
  isPastEvent,
  getOffersByEventType,
  getSelectedOffers,
  getCityById
};
