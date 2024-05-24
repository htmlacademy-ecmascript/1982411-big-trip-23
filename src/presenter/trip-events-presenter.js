import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
// import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import { NEW_EVENT_CITY, NEW_EVENT_INFO } from '../const.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #tripEventsListComponent = new TripEventsListView();
  #events = [];
  #cities = [];
  #offers = [];

  constructor({tripEventsContainer, eventsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#cities = [...this.#eventsModel.cities];
    this.#offers = [...this.#eventsModel.offers];
    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
    const sortedEvents = this.#getSortedEvents(this.#events);
    for (let i = 0; i < sortedEvents.length; i++) {
      this.#renderEvent(this.#getEventInfo(sortedEvents[i]));
    }
  }

  #getSortedEvents(events) {
    const sortedEvents = events.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    return sortedEvents;
  }

  #getEventInfo(event) {
    if (!event) {
      const emptyEventsInfo = {
        eventData: NEW_EVENT_INFO,
        city: NEW_EVENT_CITY,
        selectedOffers: [],
        offers: [],
        citiesList: this.#cities,
      };
      return emptyEventsInfo;
    }

    const eventsInfo = {
      eventData: event,
      city: this.#eventsModel.getCityById(event.destination),
      selectedOffers: this.#eventsModel.getSelectedOffers(event.type, event.offers),
      offers: this.#eventsModel.getOffersByEventType(event.type),
      citiesList: this.#cities,
    };
    return eventsInfo;
  }

  #renderEvent(event) {
    const eventComponent = new TripEventsListItemView({event});
    render(eventComponent, this.#tripEventsListComponent.element);
  }
}
