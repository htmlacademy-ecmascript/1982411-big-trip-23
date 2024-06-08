import { EVENTS_COUNT } from '../const';
import { getRandomMockEvent } from '../mock/events-mock';
import { getMockOffers } from '../mock/offers-mock';
import { getMockCities } from '../mock/cities-mock';

export default class EventsModel {
  #events = Array.from({length: EVENTS_COUNT}, getRandomMockEvent);
  #offers = getMockOffers();
  #cities = getMockCities();

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get cities() {
    return this.#cities;
  }
}
