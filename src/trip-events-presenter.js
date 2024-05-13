import SortView from './view/sort-view.js';
import TripEventsListView from './view/trip-events-list-view.js';
import TripEventsListItemView from './view/trip-events-list-item-view.js';
import EditEventFormView from './view/edit-event-form-view.js';

import {render} from './render.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventsListComponent, this.tripEventsContainer);
    render(new EditEventFormView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripEventsListItemView(), this.tripEventsListComponent.getElement());
    }
  }
}
