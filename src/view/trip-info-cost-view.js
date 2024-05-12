import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const TRIP_INFO_COST_MARKUP = `
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`;

export default class TripInfoCostView {
  getTemplate() {
    return createTemplate(TRIP_INFO_COST_MARKUP);
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
