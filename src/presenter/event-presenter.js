import {render, replace, remove} from '../framework/render.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddAndEditEventFormView from '../view/add-and-edit-event-form-view.js';

export default class EventPresenter {
  #eventListContainer = null;

  #eventsListItemComponent = null;
  #addAndEditEventFormComponent = null;

  #event = null;

  constructor({eventListContainer}) {
    this.#eventListContainer = eventListContainer;
  }

  init(event) {
    this.#event = event;

    const prevEventsListItemComponent = this.#eventsListItemComponent;
    const prevAddAndEditEventFormComponent = this.#addAndEditEventFormComponent;

    this.#eventsListItemComponent = new TripEventsListItemView({
      event: this.#event,
      onOpenEditFormClick: this.#handleOpenEditFormClick,
    });
    this.#addAndEditEventFormComponent = new AddAndEditEventFormView({
      event: this.#event,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      isEditEventForm: true
    });

    if (prevEventsListItemComponent === null || prevAddAndEditEventFormComponent === null) {
      render(this.#eventsListItemComponent, this.#eventListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#eventListContainer.contains(prevAddAndEditEventFormComponent.element)) {
      replace(this.#eventsListItemComponent, prevEventsListItemComponent);
    }

    if (this.#eventListContainer.contains(prevAddAndEditEventFormComponent.element)) {
      replace(this.#addAndEditEventFormComponent, prevAddAndEditEventFormComponent);
    }

    remove(prevAddAndEditEventFormComponent);
    remove(prevAddAndEditEventFormComponent);
  }

  destroy() {
    remove(this.#eventsListItemComponent);
    remove(this.#addAndEditEventFormComponent);
  }

  #replaceEventItemToForm() {
    replace(this.#addAndEditEventFormComponent, this.#eventsListItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEventItem() {
    replace(this.#eventsListItemComponent, this.#addAndEditEventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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

  #handleFormSubmit = () => {
    this.#replaceFormToEventItem();
  };

  #handleFormClose = () => {
    this.#replaceFormToEventItem();
  };
}
