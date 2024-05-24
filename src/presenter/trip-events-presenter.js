import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import { NEW_EVENT_CITY, NEW_EVENT_INFO } from '../const.js';

import {render} from '../render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventsContainer, eventsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.cities = [...this.eventsModel.getCities()];
    this.offers = [...this.eventsModel.getOffers()];
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventsListComponent, this.tripEventsContainer);
    this.renderEvents(this.events);
  }

  renderEvents(events) {
    const sortedEvents = events.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    const getEventInfo = (event) => {
      if (!event) {
        const emptyEventsInfo = {
          eventData: NEW_EVENT_INFO,
          city: NEW_EVENT_CITY,
          selectedOffers: [],
          offers: [],
          citiesList: this.cities,
        };
        return emptyEventsInfo;
      }

      const eventsInfo = {
        eventData: event,
        city: this.eventsModel.getCityById(event.destination),
        selectedOffers: this.eventsModel.getSelectedOffers(event.type, event.offers),
        offers: this.eventsModel.getOffersByEventType(event.type),
        citiesList: this.cities,
      };
      return eventsInfo;
    };


    render(new AddAndEditEventFormView({event: getEventInfo(sortedEvents[0])}), this.tripEventsListComponent.getElement());
    for (let i = 1; i < sortedEvents.length; i++) {
      render(new TripEventsListItemView({event: getEventInfo(sortedEvents[i])}), this.tripEventsListComponent.getElement());
    }
  }
}
