import {createElement} from '../render.js';
import { getFormettedEventDate, getTotalEventPrice } from '../utils.js';
import { DATE_FORMAT, EVENT_TYPES } from '../const.js';

function createDestinationTemplate(citiesList) {
  let destinationTemplate = '';
  if (citiesList && citiesList.length !== 0) {
    for (let i = 0; i < citiesList.length; i++) {
      destinationTemplate += `<option value="${citiesList[i].name}"></option>`;
    }
  }
  return destinationTemplate;
}

function createEventTypeItemTemplate(eventTypesList, selectedEeventType) {
  let eventTypeItemTemplate = '';
  for (let i = 0; i < eventTypesList.length; i++) {
    const selectedEventTypeAttribute = selectedEeventType.toLowerCase() === eventTypesList[i].toLowerCase() ? 'checked' : '';
    eventTypeItemTemplate += `
      <div class="event__type-item">
        <input id="event-type-${eventTypesList[i].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventTypesList[i].toLowerCase()}" ${selectedEventTypeAttribute}>
        <label class="event__type-label  event__type-label--${eventTypesList[i].toLowerCase()}" for="event-type-${eventTypesList[i].toLowerCase()}-1">${eventTypesList[i]}</label>
      </div>
    `;
  }
  return eventTypeItemTemplate;
}

function createOfferTemplate(offers, selectedOffers) {
  let offerTemplate = '';
  if (offers && offers.length !== 0) {
    const selectedOffersSet = new Set(selectedOffers.map((offer) => offer.id));

    for (let i = 0; i < offers.length; i++) {
      const selectedOfferAttribute = selectedOffersSet.has(offers[i].id) ? 'checked' : '';
      offerTemplate += `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-offer${i}-1" type="checkbox" name="event-offer-offer${i}" ${selectedOfferAttribute}>
          <label class="event__offer-label" for="event-offer-offer${i}-1">
            <span class="event__offer-title">${offers[i].title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offers[i].price}</span>
          </label>
        </div>
      `;
    }
  }
  return offerTemplate;
}

function createImageTemplate(pictures) {
  let imageTemplate = '';
  if (pictures && pictures.length !== 0) {
    for (let i = 0; i < pictures.length; i++) {
      imageTemplate += `<img class="event__photo" src="${pictures[i].src}" alt="${pictures[i].description}">`;
    }
  }
  return imageTemplate;
}

function createAddEventFormTemplate(event) {
  const {eventData: { basePrice, dateFrom, dateTo, type, }, city: { name: cityName, description: cityDescription, pictures}, selectedOffers, offers, citiesList } = event;
  const startDate = getFormettedEventDate(dateFrom, DATE_FORMAT.INPUT_DATE_FORMAT);
  const endDate = getFormettedEventDate(dateTo, DATE_FORMAT.INPUT_DATE_FORMAT);
  const totalPrice = getTotalEventPrice(basePrice, selectedOffers);
  const hideOffersClass = !offers || offers.length === 0 ? 'hide' : '';
  const hideDestinationClass = !cityName ? 'hide' : '';
  const hidePhotosClass = !pictures || pictures.length === 0 ? 'hide' : '';

  return `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeItemTemplate(EVENT_TYPES, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createDestinationTemplate(citiesList)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${hideOffersClass}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${createOfferTemplate(offers, selectedOffers)}
        </div>
      </section>

      <section class="event__section  event__section--destination ${hideDestinationClass}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${cityDescription}</p>

        <div class="event__photos-container ${hidePhotosClass}">
          <div class="event__photos-tape">
            ${createImageTemplate(pictures)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>
  `;
}

export default class AddEventFormView {
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createAddEventFormTemplate(this.event);
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
