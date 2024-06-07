import {nanoid} from 'nanoid';
import { getRandomArrayElement } from '../utils/common';

const mockEvents = [
  {
    'basePrice': 174,
    'dateFrom': '2024-04-15T15:08:07.164Z',
    'dateTo': '2024-04-17T15:10:07.164Z',
    'destination': 'e5c26d80-c07c-4012-8d46-d510fdb2c79c',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'basePrice': 4437,
    'dateFrom': '2024-04-19T13:56:07.164Z',
    'dateTo': '2024-04-20T01:52:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'basePrice': 9819,
    'dateFrom': '2024-04-21T16:16:07.164Z',
    'dateTo': '2024-04-21T23:41:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': true,
    'offers': [
      '48ef59a9-7bad-4a89-a057-6a3fd8a05574',
      'ca6f9a93-6e4a-4471-bdca-12a5d6360ce5',
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'basePrice': 3324,
    'dateFrom': '2024-04-22T16:22:07.164Z',
    'dateTo': '2024-04-24T10:13:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'basePrice': 6710,
    'dateFrom': '2024-04-25T15:51:07.164Z',
    'dateTo': '2024-04-27T05:45:07.164Z',
    'destination': '3d098017-7ce8-420a-a792-c3baafaa3bf4',
    'isFavorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'basePrice': 1622,
    'dateFrom': '2024-04-27T20:06:07.164Z',
    'dateTo': '2024-04-29T02:01:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      'ae85920c-b179-4ddf-80c6-031081d06696',
      '48ef59a9-7bad-4a89-a057-6a3fd8a05574',
      'ca6f9a93-6e4a-4471-bdca-12a5d6360ce5',
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'basePrice': 2494,
    'dateFrom': '2024-04-30T11:46:07.164Z',
    'dateTo': '2024-05-01T17:57:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      '24968829-a4b8-4691-8915-a39348ec1e9c',
      'e5d12b20-9e0b-4ed6-a92e-c84ef070e183'
    ],
    'type': 'drive'
  },
  {
    'basePrice': 2541,
    'dateFrom': '2024-05-02T18:49:07.164Z',
    'dateTo': '2024-05-04T16:09:07.164Z',
    'destination': '16c73b9f-169f-45a2-94f3-d6689937e332',
    'isFavorite': true,
    'offers': [
      '8576f4b9-4071-405f-ba15-337b6500a493',
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'basePrice': 7180,
    'dateFrom': '2024-05-05T16:56:07.164Z',
    'dateTo': '2024-05-07T13:08:07.164Z',
    'destination': 'e5c26d80-c07c-4012-8d46-d510fdb2c79c',
    'isFavorite': true,
    'offers': [
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'basePrice': 1578,
    'dateFrom': '2024-05-09T04:37:07.164Z',
    'dateTo': '2024-05-11T04:06:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [
      '8576f4b9-4071-405f-ba15-337b6500a493',
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'basePrice': 4667,
    'dateFrom': '2024-05-12T16:52:07.164Z',
    'dateTo': '2024-05-13T05:57:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '3fc54970-f17d-4268-be14-198f77c2a883',
      '2b182504-880c-4915-af79-39b69651490d',
      'aca5339a-b38b-4d83-9619-c41e984d23a0'
    ],
    'type': 'flight'
  },
  {
    'basePrice': 7143,
    'dateFrom': '2024-05-14T02:35:07.164Z',
    'dateTo': '2024-05-15T22:01:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'basePrice': 6372,
    'dateFrom': '2024-05-17T10:44:07.164Z',
    'dateTo': '2024-05-18T05:59:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'basePrice': 1792,
    'dateFrom': '2024-05-19T19:26:07.164Z',
    'dateTo': '2024-05-20T05:15:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      'dc55aea4-0e34-4989-97a6-eb29da358e6a',
      '304b839a-b9cd-41b8-9aa2-96f9ab4ca41f'
    ],
    'type': 'bus'
  },
  {
    'basePrice': 124,
    'dateFrom': '2024-05-21T05:42:07.164Z',
    'dateTo': '2024-05-22T14:50:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      '5284ce5c-16f5-40a5-99d4-8c760bad607e',
      '3e70d7a0-c554-49b2-8d13-18a03624a0be'
    ],
    'type': 'restaurant'
  },
  {
    'basePrice': 8568,
    'dateFrom': '2024-05-23T02:12:07.164Z',
    'dateTo': '2024-05-23T17:11:07.164Z',
    'destination': '4715f1ce-023d-4832-bb76-e6ca381ec287',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'basePrice': 2890,
    'dateFrom': '2024-05-24T17:32:07.164Z',
    'dateTo': '2024-05-26T00:23:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'basePrice': 1688,
    'dateFrom': '2024-05-26T07:28:07.164Z',
    'dateTo': '2024-05-26T23:15:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'basePrice': 512,
    'dateFrom': '2024-05-27T22:07:07.164Z',
    'dateTo': '2024-05-28T21:16:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '5077482b-05c8-4147-a8bc-b8de9cf09f51',
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'basePrice': 1511,
    'dateFrom': '2024-05-29T15:24:07.164Z',
    'dateTo': '2024-05-30T03:42:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'basePrice': 9872,
    'dateFrom': '2024-05-30T18:17:07.164Z',
    'dateTo': '2024-05-31T22:15:07.164Z',
    'destination': 'd4f42ec2-e0b7-484a-85c5-0ec4dd7e236e',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'basePrice': 6794,
    'dateFrom': '2024-06-01T20:39:07.164Z',
    'dateTo': '2024-06-03T18:43:07.164Z',
    'destination': 'd4f42ec2-e0b7-484a-85c5-0ec4dd7e236e',
    'isFavorite': false,
    'offers': [
      '07ca56e9-f70b-4a8b-8239-ebe1a8faef51',
      '3ff6e0b1-12df-470f-a3f9-eb49db1201fc',
      '5077482b-05c8-4147-a8bc-b8de9cf09f51',
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'basePrice': 740,
    'dateFrom': '2024-06-04T13:11:07.164Z',
    'dateTo': '2024-06-05T09:12:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'basePrice': 1841,
    'dateFrom': '2024-06-06T08:03:07.164Z',
    'dateTo': '2024-06-07T20:22:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '24968829-a4b8-4691-8915-a39348ec1e9c',
      'e5d12b20-9e0b-4ed6-a92e-c84ef070e183'
    ],
    'type': 'drive'
  },
  {
    'basePrice': 5528,
    'dateFrom': '2024-06-09T02:01:07.164Z',
    'dateTo': '2024-06-11T01:19:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '40be16b1-2d98-4d0f-898b-a5d9573b6479'
    ],
    'type': 'check-in'
  }
];

function getRandomMockEvent() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockEvents)
  };
}

export { getRandomMockEvent };
