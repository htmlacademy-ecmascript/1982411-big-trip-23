import HeaderContentPresenter from './header-content-presenter';
import TripEventsPresenter from './trip-events-presenter';

// Containers
const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.page-header__container');
const headerContentContainer = headerContainer.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

// Presenters
const headerContentPresenter = new HeaderContentPresenter({headerContentContainer: headerContentContainer});
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsContainer});

// init Presenters
headerContentPresenter.init();
tripEventsPresenter.init();
