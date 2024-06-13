import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsMessageView from '../view/trip-events-message-view.js';
import { FilterType, SortType } from '../const.js';
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
  #offers = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedEvents = [];

  constructor({tripEventsContainer, eventsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#cities = [...this.#eventsModel.cities];
    this.#offers = [...this.#eventsModel.offers];
    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderEventsBoard();
  }

  #handleTripEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#cities, this.#offers);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripEvent(event, cities, offers) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleTripEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event, cities, offers);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEventsBoard() {
    if (!this.#events || this.#events.length === 0) {
      this.#renderTripEventsList();
      this.#renderTripEventsMessage();
      return;
    }

    this.#renderSort();
    this.#renderTripEventsList();
    this.#sortTasks(SortType.DEFAULT);
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
      case SortType.DEFAULT:
        this.#events.sort(sortByDate);
        break;
      case SortType.TIME_DOWN:
        this.#events.sort(sortByTime);
        break;
      case SortType.PRICE_DOWN:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = eventSortType;
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
    render(new TripEventsMessageView({ filterType: FilterType.EVERYTHING }), this.#tripEventsListComponent.element);
  }

  #renderTripEvents() {
    this.#events.forEach((event) => {
      this.#renderTripEvent(event, this.#cities, this.#offers);
    });
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}
