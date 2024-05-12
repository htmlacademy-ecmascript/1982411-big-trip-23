import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const TRIP_EVENTS_LIST_MARKUP = `
<ul class="trip-events__list"></ul>`;

export default class TripEventsListView {
  getTemplate() {
    return createTemplate(TRIP_EVENTS_LIST_MARKUP);
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
