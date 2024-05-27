import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsMessageTemplate(message) {
  return `
  <p class="trip-events__msg">${message}</p>
  `;
}

export default class TripEventsMessageView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();
    this.#message = message;
  }

  get template() {
    return createTripEventsMessageTemplate(this.#message);
  }
}
