import { createElement } from '../render.js';
import { getFormattedEventDate, getEventDurationTime, getTotalEventPrice } from '../utils.js';
import { DATE_FORMAT } from '../const.js';


function createTripEventsListItemOfferTemplate(offers) {
  let offerTemplate = '';
  if (offers && offers.length !== 0) {
    for (let i = 0; i < offers.length; i++) {
      offerTemplate += `
      <li class="event__offer">
         <span class="event__offer-title">${offers[i].title}</span>
           &plus;&euro;&nbsp;
         <span class="event__offer-price">${offers[i].price}</span>
      </li>
      `;
    }
  }
  return offerTemplate;
}

function createTripEventButtonFav(isFavorite) {
  const favoriteActiveClass = isFavorite ? 'event__favorite-btn--active' : '';
  return `
  <button class="event__favorite-btn ${favoriteActiveClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;
}

function createTripEventsListItemTemplate(event) {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = event.eventData;
  const { name: cityName} = event.city;
  const { selectedOffers } = event.eventData;

  const startDate = getFormattedEventDate(dateFrom, DATE_FORMAT.EVENT_DATE_FORMAT);
  const startDateForAttribute = getFormattedEventDate(dateFrom, DATE_FORMAT.EVENT_DATE_ATTRIBUTE_FORMAT);
  const startTime = getFormattedEventDate(dateFrom, DATE_FORMAT.EVENT_TIME_FORMAT);
  const startTimeForAttribute = getFormattedEventDate(dateFrom, DATE_FORMAT.EVENT_DATETIME_ATTRIBUTE_FORMAT);
  const endTime = getFormattedEventDate(dateTo, DATE_FORMAT.EVENT_TIME_FORMAT);
  const endTimeForAttribute = getFormattedEventDate(dateTo, DATE_FORMAT.EVENT_DATETIME_ATTRIBUTE_FORMAT);
  const durationTime = getEventDurationTime(dateFrom, dateTo);

  const totalPrice = getTotalEventPrice(basePrice, selectedOffers);

  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startDateForAttribute}">${startDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${cityName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTimeForAttribute}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${endTimeForAttribute}">${endTime}</time>
      </p>
      <p class="event__duration">${durationTime}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createTripEventsListItemOfferTemplate(selectedOffers)}
    </ul>
    ${createTripEventButtonFav(isFavorite)}
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `;
}

export default class TripEventsListItemView {
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createTripEventsListItemTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
