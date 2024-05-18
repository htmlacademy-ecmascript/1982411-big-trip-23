import dayjs from 'dayjs';
import {HOURS, MINUTES } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getFormettedEventDate(date, format) {
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

export { getRandomArrayElement, getFormettedEventDate, getEventDurationTime, getTotalEventPrice };
