import Observable from '../framework/observable.js';
import { EVENTS_COUNT } from '../const';
import { getRandomMockEvent } from '../mock/events-mock';
import { getMockOffers } from '../mock/offers-mock';
import { getMockCities } from '../mock/cities-mock';

export default class EventsModel extends Observable {
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

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
