const EVENTS_COUNT = 4;

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DATE_FORMAT = {
  EVENT_TIME_FORMAT: 'HH:mm',
  EVENT_DATE_FORMAT: 'MMM DD',
  EVENT_DATE_ATTRIBUTE_FORMAT: 'YYYY-MM-DD',
  EVENT_DATETIME_ATTRIBUTE_FORMAT: 'YYYY-MM-DDTHH:mm',
  MAIN_EVENT_DATE_START_FORMAT: 'DD',
  MAIN_EVENT_DATE_END_FORMAT: 'DD MMM',
  INPUT_DATE_FORMAT: 'DD/MM/YY HH:mm',
};

const HOURS = 24;
const MINUTES = 60;

const NEW_EVENT_INFO = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const NEW_EVENT_CITY = {
  id: '',
  description: '',
  name: '',
  pictures: [],
};

const MESSAGES = {
  FAILED: 'Failed to load latest route information',
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...'
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { EVENTS_COUNT, EVENT_TYPES, DATE_FORMAT, HOURS, MINUTES, NEW_EVENT_INFO, NEW_EVENT_CITY, MESSAGES, FILTER_TYPE};
