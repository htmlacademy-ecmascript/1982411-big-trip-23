import {createElement} from '../render.js';

function createTripEventsMessageTemplate() {
  return `
  <p class="trip-events__msg">Trip Events Message</p>
  `;
}

export default class TripEventsMessageView {
  getTemplate() {
    return createTripEventsMessageTemplate();
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
