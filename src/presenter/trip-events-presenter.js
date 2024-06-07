import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsMessageView from '../view/trip-events-message-view.js';
import { newEventCity, newEventInfo, filterType } from '../const.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #tripEventsListComponent = new TripEventsListView();
  #sortComponent = new SortView();
  #events = [];
  #cities = [];
  #eventPresenters = new Map();

  constructor({tripEventsContainer, eventsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#cities = [...this.#eventsModel.cities];

    this.#renderEventsBoard();
  }

  #getSortedEvents(events) {
    //TODO: переделать (при создании сортировки)
    const sortedEvents = events.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    return sortedEvents;
  }

  #getEventInfo(event) {
    if (!event) {
      const emptyEventsInfo = {
        eventData: newEventInfo,
        city: newEventCity,
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

  #handleTripEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.eventData.id).init(updatedEvent);
  };

  #renderTripEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleTripEventChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.eventData.id, eventPresenter);
  }

  #renderEventsBoard() {
    if (!this.#events || this.#events.length === 0) {
      this.#renderTripEventsList();
      this.#renderTripEventsMessage();
      return;
    }

    this.#renderSort();
    this.#renderTripEventsList();
    this.#renderTripEvents();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderTripEventsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
  }

  #renderTripEventsMessage() {
    render(new TripEventsMessageView({ filterType: filterType.EVERYTHING }), this.#tripEventsListComponent.element);
  }

  #renderTripEvents() {
    const sortedEvents = this.#getSortedEvents(this.#events);
    sortedEvents.forEach((event) => {
      this.#renderTripEvent(this.#getEventInfo(event));
    });
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}