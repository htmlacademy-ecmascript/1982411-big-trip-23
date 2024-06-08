import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsMessageView from '../view/trip-events-message-view.js';
import { newEventCity, newEventInfo, filterType, sortType } from '../const.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils/sort.js';

import { render } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #tripEventsListComponent = new TripEventsListView();
  #sortComponent = null;
  #events = [];
  #cities = [];
  #eventPresenters = new Map();
  #currentSortType = sortType.DEFAULT;
  #sourcedEvents = [];

  constructor({tripEventsContainer, eventsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#cities = [...this.#eventsModel.cities];
    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderEventsBoard();
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
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.eventData.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleTripEventChange,
      onModeChange: this.#handleModeChange
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
    this.#sortTasks(sortType.DEFAULT);
    this.#renderTripEvents();
  }

  #handleSortTypeChange = (eventSortType) => {
    if (this.#currentSortType === eventSortType) {
      return;
    }

    this.#sortTasks(eventSortType);
    this.#clearEventsList();
    this.#renderTripEvents();
  };

  #sortTasks(eventSortType) {
    switch (eventSortType) {
      case sortType.DEFAULT:
        this.#events.sort(sortByDate);
        break;
      case sortType.TIME_DOWN:
        this.#events.sort(sortByTime);
        break;
      case sortType.PRICE_DOWN:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortEventType: this.#currentSortType
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderTripEventsList() {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
  }

  #renderTripEventsMessage() {
    render(new TripEventsMessageView({ filterType: filterType.EVERYTHING }), this.#tripEventsListComponent.element);
  }

  #renderTripEvents() {
    this.#events.forEach((event) => {
      this.#renderTripEvent(this.#getEventInfo(event));
    });
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}
