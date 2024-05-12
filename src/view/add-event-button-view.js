import {createElement} from '../render.js';
import {createTemplate} from '../utils.js';

const ADD_EVENT_BUTTON_MARKUP = `
<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;

export default class AddEventButtonView {
  getTemplate() {
    return createTemplate(ADD_EVENT_BUTTON_MARKUP);
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
