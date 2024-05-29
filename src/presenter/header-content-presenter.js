import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import FiltersView from '../view/filters-view.js';
import AddEventButtonView from '../view/add-event-button-view.js';
import { generateFilter } from '../mock/filter-mock.js';

import { render } from '../framework/render.js';

export default class HeaderContentPresenter {
  #headerContentContainer = null;
  #tripInfoContainer = null;
  #tripControlsFiltersContainer = null;
  #eventsModel = null;
  #events = null;

  constructor({headerContentContainer, tripInfoContainer, tripControlsFiltersContainer, eventsModel}) {
    this.#headerContentContainer = headerContentContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripControlsFiltersContainer = tripControlsFiltersContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    render(new TripInfoMainView(), this.#tripInfoContainer);
    render(new TripInfoCostView(), this.#tripInfoContainer);
    this.#renderFilters();
    render(new AddEventButtonView(), this.#headerContentContainer);
  }

  #renderFilters() {
    const filters = generateFilter(this.#events);
    render(new FiltersView({filters: filters}), this.#tripControlsFiltersContainer);
  }
}
