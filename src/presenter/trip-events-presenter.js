import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import TripEventsMessageView from '../view/trip-events-message-view.js';
import { NEW_EVENT_CITY, NEW_EVENT_INFO, FILTER_TYPE } from '../const.js';

import { render, replace } from '../framework/render.js';

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

    this.#renderEvents();
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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEventItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new TripEventsListItemView({
      event,
      onOpenEditFormClick: () => {
        replaceEventItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new AddAndEditEventFormView({
      event,
      onFormSubmit: () => {
        replaceFormToEventItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToEventItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      isEditEventForm: true
    });

    function replaceEventItemToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToEventItem() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripEventsListComponent.element);
  }

  #renderEvents() {
    if (!this.#events || this.#events.length === 0) {
      render(this.#tripEventsListComponent, this.#tripEventsContainer);
      render(new TripEventsMessageView({ filterType: FILTER_TYPE.EVERYTHING }), this.#tripEventsListComponent.element);
      return;
    }

    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventsListComponent, this.#tripEventsContainer);

    const sortedEvents = this.#getSortedEvents(this.#events);
    for (let i = 0; i < sortedEvents.length; i++) {
      this.#renderEvent(this.#getEventInfo(sortedEvents[i]));
    }
  }
}
