import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsMessageTemplate() {
  return `
  <p class="trip-events__msg">Trip Events Message</p>
  `;
}

export default class TripEventsMessageView extends AbstractView {
  get template() {
    return createTripEventsMessageTemplate();
  }
}
