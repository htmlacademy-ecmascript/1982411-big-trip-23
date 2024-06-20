import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import FilterPresenter from '../presenter/filter-presenter.js';

import { render } from '../framework/render.js';

export default class HeaderContentPresenter {
  #headerContentContainer = null;
  #tripInfoContainer = null;
  #tripControlsFiltersContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #filterPresenter = null;
  #addEventButtonComp = null;

  constructor({headerContentContainer, tripInfoContainer, tripControlsFiltersContainer, eventsModel, filterModel, addEventButtonComp}) {
    this.#headerContentContainer = headerContentContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripControlsFiltersContainer = tripControlsFiltersContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#tripControlsFiltersContainer,
      filterModel: this.#filterModel,
      eventsModel: this.#eventsModel
    });
    this.#addEventButtonComp = addEventButtonComp;
  }

  init() {
    render(new TripInfoMainView(), this.#tripInfoContainer);
    render(new TripInfoCostView(), this.#tripInfoContainer);
    this.#renderFilters();
    render(this.#addEventButtonComp, this.#headerContentContainer);
  }

  #renderFilters() {
    this.#filterPresenter.init();
  }
}
