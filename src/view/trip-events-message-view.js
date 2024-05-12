import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const TRIP_EVENTS_MESSAGE_MARKUP = `
<p class="trip-events__msg">Trip Events Message</p>`;

export default class TripEventsMessageView {
  getTemplate() {
    return createTemplate(TRIP_EVENTS_MESSAGE_MARKUP);
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
