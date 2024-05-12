import TripInfoView from './view/trip-info-view.js';
import TripInfoMainView from './view/trip-info-main-view.js';
import TripInfoCostView from './view/trip-info-cost-view.js';
import FiltersView from './view/filters-view.js';
import AddEventButtonView from './view/add-event-button-view.js';
import TripControlsView from './view/trip-controls-view.js';

import {render} from './render.js';

export default class HeaderContentPresenter {
  tripControlsComponent = new TripControlsView();
  tripInfoComponent = new TripInfoView();

  constructor({headerContentContainer}) {
    this.headerContentContainer = headerContentContainer;
  }

  init() {
    render(this.tripInfoComponent, this.headerContentContainer);
    render(new TripInfoMainView(), this.tripInfoComponent.getElement());
    render(new TripInfoCostView(), this.tripInfoComponent.getElement());
    render(this.tripControlsComponent, this.headerContentContainer);
    render(new FiltersView(), this.tripControlsComponent.getElement());
    render(new AddEventButtonView(), this.headerContentContainer);
  }
}
