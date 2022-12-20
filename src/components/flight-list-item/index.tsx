import React, { FC } from 'react';
// store
import { IFlight } from 'store';
// styles
import s from './styles.module.css';
import s7Logo from 'assets/images/S7-logo.png';
// utils
import { EAirline } from 'utils/constants';
import { formatDate, getDuration } from 'utils/functions';

function getAirlineLogo(airline: string) {
  switch (airline) {
    case EAirline.S_7:
      return s7Logo;
  }
}

function getPrice(price: number) {
  return `${price.toLocaleString()} Р`;
}

function getTimeTitle(from: string, to: string) {
  return `${from} - ${to}`;
}

function getTimeValue(dateStart: Date, dateEnd: Date) {
  return `${formatDate(dateStart, 'HH:mm')} - ${formatDate(dateEnd, 'HH:mm')}`;
}

function getDurationValue(dateStart: Date, dateEnd: Date) {
  const MINUTES_IN_HOUR = 60;
  const SECONDS_IN_MINUTE = 60;
  const MS_IN_SECONDS = 1000;

  let msDuration = getDuration(dateStart, dateEnd);

  let hourDuration = Math.floor(msDuration / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECONDS));
  let minuteDuration = (msDuration / (SECONDS_IN_MINUTE * MS_IN_SECONDS)) % 60;

  return `${hourDuration}ч ${minuteDuration}м`;
}

function getLayoversTitle(layovers: string[]) {
  // Solution constraint: < 20 layovers per flight
  switch (layovers.length) {
    case 0:
      return 'Без пересадок';
    case 1:
      return `${layovers.length} пересадка`;
    case 2:
    case 3:
    case 4:
      return `${layovers.length} пересадки`;
    default:
      return `${layovers.length} пересадок`;
  }
}

function getLayoversValue(layovers: string[]) {
  return layovers.map((layover, index, arr) =>
    index === arr.length - 1 ? layover : `${layover}, `
  );
}

type FlightListItemProps = {
  flight: IFlight;
};

export const FlightListItem: FC<FlightListItemProps> = ({ flight }) => {
  return (
    <li className={s.flight}>
      <header className={s.header}>
        <span className={s.price}>{getPrice(flight.price)}</span>
        <span className={s.airline}>
          <img src={getAirlineLogo(flight.airline)} alt='airline logo' width={120} height={40} />
        </span>
      </header>
      <div className={s.details}>
        <div className={s.depart}>
          <div className={s.time}>
            <span className={s.title}>
              {getTimeTitle(flight.depart.departurePoint, flight.depart.arrivalPoint)}
            </span>
            <span className={s.value}>
              {getTimeValue(flight.depart.dateStart, flight.depart.dateEnd)}
            </span>
          </div>
          <div className={s.duration}>
            <span className={s.title}>В ПУТИ</span>
            <span className={s.value}>
              {getDurationValue(flight.depart.dateStart, flight.depart.dateEnd)}
            </span>
          </div>
          <div className={s.layovers}>
            <span className={s.title}>{getLayoversTitle(flight.depart.layovers)}</span>
            <span className={s.value}>{getLayoversValue(flight.depart.layovers)}</span>
          </div>
        </div>
        <div className={s.return}>
          <div className={s.time}>
            <span className={s.title}>
              {getTimeTitle(flight.return.departurePoint, flight.return.arrivalPoint)}
            </span>
            <span className={s.value}>
              {getTimeValue(flight.return.dateStart, flight.return.dateEnd)}
            </span>
          </div>
          <div className={s.duration}>
            <span className={s.title}>В ПУТИ</span>
            <span className={s.value}>
              {getDurationValue(flight.return.dateStart, flight.return.dateEnd)}
            </span>
          </div>
          <div className={s.layovers}>
            <span className={s.title}>{getLayoversTitle(flight.return.layovers)}</span>
            <span className={s.value}>{getLayoversValue(flight.return.layovers)}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
