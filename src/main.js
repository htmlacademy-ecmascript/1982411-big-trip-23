import HeaderContentPresenter from './presenter/header-content-presenter';
import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';
import AddEventButtonView from './view/add-event-button-view.js';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripInfoContainer = headerContentContainer.querySelector('.trip-info');
const tripControlsFiltersContainer = headerContentContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

// Models
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

// Components
const newEventButtonComponent = new AddEventButtonView({
  onClick: handleNewEventButtonClick
});

// Presenters
const headerContentPresenter = new HeaderContentPresenter({
  headerContentContainer: headerContentContainer,
  tripInfoContainer: tripInfoContainer,
  tripControlsFiltersContainer: tripControlsFiltersContainer,
  eventsModel,
  filterModel,
  addEventButtonComp: newEventButtonComponent
});
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripEventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

// init Presenters
headerContentPresenter.init();
tripEventsPresenter.init();
