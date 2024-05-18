import SortView from '../view/sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
// import AddEventFormView from '../view/add-event-form-view.js';

import {render} from '../render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventsContainer, eventsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.eventsInfo = [...this.eventsModel.getEventsInfo()];
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventsListComponent, this.tripEventsContainer);
    // render(new AddEventFormView ({event: this.eventsInfo[0]}), this.tripEventsListComponent.getElement());
    render(new EditEventFormView({event: this.eventsInfo[0]}), this.tripEventsListComponent.getElement());
    for (let i = 1; i < this.eventsInfo.length; i++) {
      render(new TripEventsListItemView({event: this.eventsInfo[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
