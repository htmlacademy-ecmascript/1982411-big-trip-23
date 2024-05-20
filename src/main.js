import HeaderContentPresenter from './presenter/header-content-presenter';
import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsModel from './model/events-model';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripInfoContainer = headerContentContainer.querySelector('.trip-info');
const tripControlsFiltersContainer = headerContentContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

//Models
const eventsModel = new EventsModel();

// Presenters
const headerContentPresenter = new HeaderContentPresenter({
  headerContentContainer: headerContentContainer,
  tripInfoContainer: tripInfoContainer,
  tripControlsFiltersContainer: tripControlsFiltersContainer
});
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsContainer,
  eventsModel
});

// init Presenters
headerContentPresenter.init();
tripEventsPresenter.init();
