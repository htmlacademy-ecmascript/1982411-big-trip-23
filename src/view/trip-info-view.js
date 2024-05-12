import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const TRIP_INFO_MARKUP = `
<section class="trip-main__trip-info  trip-info"></section>`;

export default class TripInfoView {
  getTemplate() {
    return createTemplate(TRIP_INFO_MARKUP);
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
