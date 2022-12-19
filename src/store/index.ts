import { Instance, types } from 'mobx-state-tree';
import { EAirline, ELayoverOption } from 'utils/constants';

const FlightInfo = types.model({
  dateStart: types.string,
  dateEnd: types.string,
  duration: types.number,
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
        selectedFilterOptions.includes(flight.depart.layovers.length)
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
      self.flights.sort(
        (a, b) => a.depart.duration + a.return.duration - (b.depart.duration + b.return.duration)
      );
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
      depart: { dateStart: '10:45', dateEnd: '08:00', duration: 1275, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:50', duration: 810, layovers: ['HKG'] },
    },
    {
      id: 1,
      airline: EAirline.S_7,
      price: 13400,
      depart: { dateStart: '10:45', dateEnd: '07:00', duration: 1215, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:50', duration: 810, layovers: ['HKG'] },
    },
    {
      id: 2,
      airline: EAirline.S_7,
      price: 13100,
      depart: { dateStart: '10:45', dateEnd: '08:00', duration: 1275, layovers: ['HKG', 'JNB'] },
      return: { dateStart: '11:20', dateEnd: '00:40', duration: 800, layovers: ['HKG'] },
    },
    {
      id: 3,
      airline: EAirline.S_7,
      price: 13600,
      depart: { dateStart: '10:45', dateEnd: '07:00', duration: 1215, layovers: [] },
      return: { dateStart: '11:20', dateEnd: '00:40', duration: 800, layovers: [] },
    },
    {
      id: 4,
      airline: EAirline.S_7,
      price: 10600,
      depart: {
        dateStart: '10:45',
        dateEnd: '17:00',
        duration: 1815,
        layovers: ['HKG', 'JNB', 'HKG'],
      },
      return: { dateStart: '11:20', dateEnd: '00:40', duration: 800, layovers: ['HKG', 'JNB'] },
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
