import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const TRIP_CONTROLS_MARKUP = `
<div class="trip-main__trip-controls  trip-controls"></div>`;

export default class TripControlsView {
  getTemplate() {
    return createTemplate(TRIP_CONTROLS_MARKUP);
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
