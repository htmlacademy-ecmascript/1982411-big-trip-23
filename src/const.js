const EVENTS_COUNT = 4;

const eventType = [
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

const dateFormat = {
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

const newEventInfo = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const newEventCity = {
  id: '',
  description: '',
  name: '',
  pictures: [],
};

const Message = {
  FAILED: 'Failed to load latest route information',
  LOADING: 'Loading...'
};

const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filterEmptyMessage = {
  [filterType.EVERYTHING]: 'Click New Event to create your first point',
  [filterType.FUTURE]: 'There are no future events now',
  [filterType.PRESENT]: 'There are no present events now',
  [filterType.PAST]: 'There are no past events now',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export { EVENTS_COUNT, eventType, dateFormat, HOURS, MINUTES, newEventInfo, newEventCity, Message, filterType, filterEmptyMessage, Mode};
