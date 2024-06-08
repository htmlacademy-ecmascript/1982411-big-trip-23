import {render, replace, remove} from '../framework/render.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';
import { Mode } from '../const.js';

export default class EventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventsListItemComponent = null;
  #addAndEditEventFormComponent = null;

  #event = null;
  #cities = [];
  #offers = [];
  #mode = Mode.DEFAULT;

  constructor({eventListContainer, onDataChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, cities, offers) {
    this.#event = event;
    this.#cities = cities;
    this.#offers = offers;

    const prevEventsListItemComponent = this.#eventsListItemComponent;
    const prevAddAndEditEventFormComponent = this.#addAndEditEventFormComponent;

    this.#eventsListItemComponent = new TripEventsListItemView({
      event: this.#event,
      cities: this.#cities,
      offers: this.#offers,
      onOpenEditFormClick: this.#handleOpenEditFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
    this.#addAndEditEventFormComponent = new AddAndEditEventFormView({
      event: this.#event,
      cities: this.#cities,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      isEditEventForm: true
    });

    if (prevEventsListItemComponent === null || prevAddAndEditEventFormComponent === null) {
      render(this.#eventsListItemComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventsListItemComponent, prevEventsListItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#addAndEditEventFormComponent, prevAddAndEditEventFormComponent);
    }

    remove(prevEventsListItemComponent);
    remove(prevAddAndEditEventFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEventItem();
    }
  }

  destroy() {
    remove(this.#eventsListItemComponent);
    remove(this.#addAndEditEventFormComponent);
  }

  #replaceEventItemToForm() {
    replace(this.#addAndEditEventFormComponent, this.#eventsListItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEventItem() {
    replace(this.#eventsListItemComponent, this.#addAndEditEventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEventItem();
    }
  };

  #handleOpenEditFormClick = () => {
    this.#replaceEventItemToForm();
  };

  #handleFavoriteClick = () => {
    const changedData = {...this.#event, isFavorite: !this.#event.isFavorite };
    this.#handleDataChange(changedData);
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceFormToEventItem();
  };

  #handleFormClose = () => {
    this.#replaceFormToEventItem();
  };
}
