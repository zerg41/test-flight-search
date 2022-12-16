import { values } from 'mobx';
import { types } from 'mobx-state-tree';

const S_SEVEN = 's7';

const FlightInfo = types.model({
  dateStart: types.string,
  dateEnd: types.string,
  duration: types.number,
  layovers: types.array(types.string),
});

const Ticket = types.model({
  id: types.identifierNumber,
  airline: types.string,
  price: types.number,
  depart: FlightInfo,
  return: FlightInfo,
});

const RootStore = types
  .model({
    tickets: types.array(Ticket),
  })
  .actions((self) => ({
    sortByPrice() {
      self.tickets.sort((a, b) => a.price - b.price);
    },
    sortByDuration() {
      self.tickets.sort(
        (a, b) => a.depart.duration + a.return.duration - (b.depart.duration + b.return.duration)
      );
    },
  }));

export const store = RootStore.create({
  tickets: [
    {
      id: 0,
      airline: S_SEVEN,
      price: 13000,
      depart: { dateStart: '10:45', dateEnd: '08:00', duration: 1275, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:50', duration: 810, layovers: ['HKG'] },
    },
    {
      id: 1,
      airline: S_SEVEN,
      price: 13400,
      depart: { dateStart: '10:45', dateEnd: '07:00', duration: 1215, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:50', duration: 810, layovers: ['HKG'] },
    },
    {
      id: 2,
      airline: S_SEVEN,
      price: 13100,
      depart: { dateStart: '10:45', dateEnd: '08:00', duration: 1275, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:40', duration: 800, layovers: ['HKG'] },
    },
  ],
});
