import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormattedEventDate, getTotalEventPrice, getSelectedOffers, getCityById, getOffersByEventType } from '../utils/event.js';
import { dateFormat, eventType, PRICE_PATTERN } from '../const.js';

function createDestinationTemplate(citiesList) {
  let destinationTemplate = '';
  if (citiesList && citiesList.length !== 0) {
    citiesList.forEach((city) => {
      destinationTemplate += `<option value="${city.name}"></option>`;
    });
  }
  return destinationTemplate;
}

function createCloseFormButton(isEditEventForm) {
  let closeFormButtonTemplete = '';
  if (isEditEventForm) {
    closeFormButtonTemplete += `
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    `;
  }
  return closeFormButtonTemplete;
}

function createEventTypeItemTemplate(eventTypesList, selectedEeventType) {
  let eventTypeItemTemplate = '';
  eventTypesList.forEach((type) => {
    const selectedEventTypeAttribute = selectedEeventType.toLowerCase() === type.toLowerCase() ? 'checked' : '';
    eventTypeItemTemplate += `
      <div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${selectedEventTypeAttribute}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>
    `;
  });
  return eventTypeItemTemplate;
}

function createOfferTemplate(offers, selectedOffers) {
  let offerTemplate = '';
  const selectedOffersSet = new Set(selectedOffers.map((offer) => offer.id));

  offers.forEach((offer, index) => {
    const selectedOfferAttribute = selectedOffersSet.has(offer.id) ? 'checked' : '';
    offerTemplate += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-offer-${index}" ${selectedOfferAttribute}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
      `;
  });
  return offerTemplate;
}

function createOffersBlockTemplate(offers, selectedOffers) {
  let offersBlockTemplate = '';
  if (offers && offers.length !== 0) {
    offersBlockTemplate += `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOfferTemplate(offers, selectedOffers)}
      </div>
    </section>
    `;
  }
  return offersBlockTemplate;
}

function createDestinationBlockTemplate(cityName, cityDescription, isEditEventForm, pictures) {
  let destinationBlockTemplate = '';
  if (cityName) {
    destinationBlockTemplate += `
    <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${cityDescription}</p>
        ${createPhotosBlockTemplate(isEditEventForm, pictures)}
    </section>
    `;
  }
  return destinationBlockTemplate;
}

function createImageTemplate(pictures) {
  let imageTemplate = '';

  pictures.forEach((picture) => {
    imageTemplate += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });

  return imageTemplate;
}

function createPhotosBlockTemplate(isEditEventForm, pictures) {
  let photosBlockTemplate = '';
  if (!isEditEventForm && (pictures && pictures.length !== 0)) {
    photosBlockTemplate += `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createImageTemplate(pictures)}
      </div>
    </div>
    `;
  }
  return photosBlockTemplate;
}

function createAddAndEditEventFormTemplate(event, cities, allOffers, isEditEventForm = false) {
  const { basePrice, dateFrom, dateTo, destination, type, offers: selectedOffersIds } = event;
  const { name: cityName, description: cityDescription, pictures } = getCityById(destination, cities);
  const selectedOffers = getSelectedOffers(type, [...selectedOffersIds], allOffers);
  const citiesList = cities;
  const offers = getOffersByEventType(type, allOffers);

  const startDate = getFormattedEventDate(dateFrom, dateFormat.INPUT_DATE_FORMAT);
  const endDate = getFormattedEventDate(dateTo, dateFormat.INPUT_DATE_FORMAT);
  const totalPrice = getTotalEventPrice(basePrice, selectedOffers);

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
            ${createEventTypeItemTemplate(eventType, type)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" pattern="${PRICE_PATTERN}" name="event-price" value="${totalPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isEditEventForm ? 'Delete' : 'Cancel'}</button>
      ${createCloseFormButton(isEditEventForm)}
    </header>
    <section class="event__details">
      ${createOffersBlockTemplate(offers, selectedOffers)}
      ${createDestinationBlockTemplate(cityName, cityDescription, isEditEventForm, pictures)}
    </section>
  </form>
  </li>
  `;
}

export default class AddAndEditEventFormView extends AbstractStatefulView {
  #cities = [];
  #offers = [];
  #handleFormSubmit = null;
  #handleFormClose = null;
  #isEditEventForm = false;

  constructor({event, cities, offers, onFormSubmit, onFormClose, isEditEventForm}) {
    super();
    this._setState(AddAndEditEventFormView.parseEventToState(event));
    this.#cities = cities;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#isEditEventForm = isEditEventForm;

    this._restoreHandlers();
  }

  get template() {
    return createAddAndEditEventFormTemplate(this._state, this.#cities, this.#offers, this.#isEditEventForm);
  }

  reset(event) {
    this.updateElement(
      AddAndEditEventFormView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#cityChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    const offersSection = this.element.querySelector('.event__section--offers');
    if (offersSection) {
      offersSection.addEventListener('change', this.#offerSelectHandler);
    }

    const closeFormButton = this.element.querySelector('.event__rollup-btn');
    if (closeFormButton) {
      closeFormButton.addEventListener('click', this.#formCloseHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddAndEditEventFormView.parseStateToEvent(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: new Set(),
      });
    }
  };

  #offerSelectHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      if (evt.target.hasAttribute('checked')) {
        this._state.offers.delete(evt.target.id);
        evt.target.removeAttribute('checked');
      } else {
        this._state.offers.add(evt.target.id);
        evt.target.setAttribute('checked', '');
      }
    }
  };

  #cityChangeHandler = (evt) => {
    const cityName = evt.target.value;
    const newCity = this.#cities.find((city) => city.name === cityName);

    if (!newCity) {
      return;
    }

    this.updateElement({
      destination: newCity.id,
    });
  };

  #priceChangeHandler = (evt) => {
    const newPrice = evt.target.value;
    if (newPrice) {
      this._state.basePrice = newPrice;
    }
  };

  static parseEventToState(event) {
    return {...event, offers: new Set(event.offers)};
  }

  static parseStateToEvent(event) {
    const updatedEvent = {...event};

    return updatedEvent;
  }
}
