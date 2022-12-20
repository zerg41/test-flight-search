import { Instance, types } from 'mobx-state-tree';
// utils
import { getDuration } from 'utils/functions';
import { EAirline, ELayoverOption } from 'utils/constants';

const FlightInfo = types.model({
  departurePoint: types.string,
  arrivalPoint: types.string,
  dateStart: types.Date,
  dateEnd: types.Date,
  layovers: types.array(types.string),
});

const Flight = types.model({
  id: types.identifierNumber,
  airline: types.string,
  price: types.number,
  depart: FlightInfo,
  return: FlightInfo,
});

const LayoverFilterOption = types
  .model({
    id: types.string,
    title: types.string,
    value: types.number,
    isChecked: types.boolean,
  })
  .actions((self) => ({
    setFilter() {
      self.isChecked = !self.isChecked;
    },
  }));

const RootStore = types
  .model({
    flights: types.array(Flight),
    layoverFilterOptions: types.array(LayoverFilterOption),
  })
  .views((self) => ({
    get filteredFlights() {
      let selectedFilterOptions = self.layoverFilterOptions.map(
        (option) => option.isChecked && option.value
      );

      return self.flights.filter((flight) =>
        selectedFilterOptions.includes(Number(flight.depart.layovers.length))
      );
    },
    get isCheckedAll() {
      return (
        self.layoverFilterOptions.filter((option) => option.isChecked === true).length ===
        self.layoverFilterOptions.length
      );
    },
  }))
  .actions((self) => ({
    sortByPrice() {
      self.flights.sort((a, b) => a.price - b.price);
    },
    sortByDuration() {
      self.flights.sort((a, b) => {
        let totalDurationA =
          getDuration(a.depart.dateStart, a.depart.dateEnd) +
          getDuration(a.return.dateStart, a.return.dateEnd);
        let totalDurationB =
          getDuration(b.depart.dateStart, b.depart.dateEnd) +
          getDuration(b.return.dateStart, b.return.dateEnd);

        return totalDurationA - totalDurationB;
      });
    },
    setAllFilters() {
      self.layoverFilterOptions.replace(
        self.layoverFilterOptions.map((option) => ({ ...option, isChecked: true }))
      );
    },
    resetAllFilters() {
      self.layoverFilterOptions.replace(
        self.layoverFilterOptions.map((option) => ({ ...option, isChecked: false }))
      );
    },
  }));

export const store = RootStore.create({
  flights: [
    {
      id: 0,
      airline: EAirline.S_7,
      price: 13000,
      depart: {
        departurePoint: 'LED',
        arrivalPoint: 'MOW',
        dateStart: new Date('2022-02-12T23:50:00'),
        dateEnd: new Date('2022-02-13T08:00:00'),
        layovers: ['HKG', 'JNB'],
      },
      return: {
        departurePoint: 'MOW',
        arrivalPoint: 'LED',
        dateStart: new Date('2022-02-25T11:30:00'),
        dateEnd: new Date('2022-02-25T15:00:00'),
        layovers: ['HKG'],
      },
    },
    {
      id: 1,
      airline: EAirline.S_7,
      price: 13400,
      depart: {
        departurePoint: 'LED',
        arrivalPoint: 'MOW',
        dateStart: new Date('2022-02-12T19:30:00'),
        dateEnd: new Date('2022-02-12T22:20:00'),
        layovers: ['HKG'],
      },
      return: {
        departurePoint: 'MOW',
        arrivalPoint: 'LED',
        dateStart: new Date('2022-02-25T11:30:00'),
        dateEnd: new Date('2022-02-25T14:47:00'),
        layovers: ['HKG'],
      },
    },
    {
      id: 2,
      airline: EAirline.S_7,
      price: 13100,
      depart: {
        departurePoint: 'LED',
        arrivalPoint: 'MOW',
        dateStart: new Date('2022-02-12T23:50:00'),
        dateEnd: new Date('2022-02-14T08:00:00'),
        layovers: ['HKG', 'JNB'],
      },
      return: {
        departurePoint: 'MOW',
        arrivalPoint: 'LED',
        dateStart: new Date('2022-02-25T11:30:00'),
        dateEnd: new Date('2022-02-25T15:00:00'),
        layovers: ['HKG'],
      },
    },
    {
      id: 3,
      airline: EAirline.S_7,
      price: 13600,
      depart: {
        departurePoint: 'LED',
        arrivalPoint: 'MOW',
        dateStart: new Date('2022-02-12T18:00:00'),
        dateEnd: new Date('2022-02-12T19:15:00'),
        layovers: [],
      },
      return: {
        departurePoint: 'MOW',
        arrivalPoint: 'LED',
        dateStart: new Date('2022-02-25T11:30:00'),
        dateEnd: new Date('2022-02-25T12:47:00'),
        layovers: [],
      },
    },
    {
      id: 4,
      airline: EAirline.S_7,
      price: 10600,
      depart: {
        departurePoint: 'LED',
        arrivalPoint: 'MOW',
        dateStart: new Date('2022-02-12T23:20:00'),
        dateEnd: new Date('2022-02-14T08:15:00'),
        layovers: ['HKG', 'JNB', 'HKG'],
      },
      return: {
        departurePoint: 'MOW',
        arrivalPoint: 'LED',
        dateStart: new Date('2022-02-25T12:30:00'),
        dateEnd: new Date('2022-02-27T15:00:00'),
        layovers: ['HKG', 'JNB'],
      },
    },
  ],
  layoverFilterOptions: [
    {
      id: 'no-layovers',
      title: 'Без пересадок',
      value: ELayoverOption.NO_LAYOVERS,
      isChecked: true,
    },
    {
      id: 'one-layover',
      title: '1 пересадка',
      value: ELayoverOption.ONE_LAYOVER,
      isChecked: true,
    },
    {
      id: 'two-layovers',
      title: '2 пересадки',
      value: ELayoverOption.TWO_LAYOVERS,
      isChecked: true,
    },
    {
      id: 'three-layovers',
      title: '3 пересадки',
      value: ELayoverOption.THREE_LAYOVERS,
      isChecked: true,
    },
  ],
});

export interface IFlight extends Instance<typeof Flight> {}
