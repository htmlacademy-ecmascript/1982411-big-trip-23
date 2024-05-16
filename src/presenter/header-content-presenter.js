import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import FiltersView from '../view/filters-view.js';
import AddEventButtonView from '../view/add-event-button-view.js';

import {render} from '../render.js';

export default class HeaderContentPresenter {

  constructor({headerContentContainer, tripInfoContainer, tripControlsFiltersContainer}) {
    this.headerContentContainer = headerContentContainer;
    this.tripInfoContainer = tripInfoContainer;
    this.tripControlsFiltersContainer = tripControlsFiltersContainer;
  }

  init() {
    render(new TripInfoMainView(), this.tripInfoContainer);
    render(new TripInfoCostView(), this.tripInfoContainer);
    render(new FiltersView(), this.tripControlsFiltersContainer);
    render(new AddEventButtonView(), this.headerContentContainer);
  }
}
