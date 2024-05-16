import { EVENTS_COUNT } from '../const';
import { getRandomMockEvent } from '../mock/events-mock';
import { getMockOffers } from '../mock/offers-mock';
import { getMockCities } from '../mock/cities-mock';

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomMockEvent);
  offers = getMockOffers();
  cities = getMockCities();

  getEvents() {
    return this.events;
  }

  getEventsInfo() {
    const eventsInfoArray = [];
    const sortedEvents = this.events.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    sortedEvents.forEach((eventItem) => {

      const eventsInfo = {
        eventData: eventItem,
        city: this.getCityById(eventItem.destination),
        selectedOffers: this.getSelectedOffers(eventItem.type, eventItem.offers),
      };

      eventsInfoArray.push(eventsInfo);
    });

    return eventsInfoArray;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByEventType(type) {
    const offer = this.getOffers().find((offerItem) => offerItem.type === type);
    return offer.offers;
  }

  getSelectedOffers(type, offers) {
    return this.getOffersByEventType(type).filter(
      (offer) => offers.includes(offer.id));
  }

  getCities() {
    return this.cities;
  }

  getCityById(id) {
    return this.getCities().find((city) => city.id === id);
  }
}
