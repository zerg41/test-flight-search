import React, { FC } from 'react';
// store
import { observer } from 'mobx-react-lite';
import { IFlight } from 'store';
// styles
import s7Logo from 'assets/images/S7-logo.png';
import s from './styles.module.css';
// utils
import { EAirline } from 'utils/constants';

type FlightItemProps = {
  flight: IFlight;
};

export const FlightListItem: FC<FlightItemProps> = observer(({ flight }) => {
  function getAirlineLogo(airline: string) {
    switch (airline) {
      case EAirline.S_7:
        return s7Logo;
    }
  }

  return (
    <li className={s.flight}>
      <header className={s.header}>
        <span className={s.price}>{`${flight.price.toLocaleString()} Р`}</span>
        <span className={s.airline}>
          <img src={getAirlineLogo(flight.airline)} alt='airline logo' width={120} height={40} />
        </span>
      </header>
      <div className={s.details}>
        <div className={s.depart}>
          <div className={s.detail}>
            <span className={s.title}>{`MOW-MOW`}</span>
            <span className={s.value}>{`${flight.depart.dateStart}-${flight.depart.dateEnd}`}</span>
          </div>
          <div className={s.detail}>
            <span className={s.title}>В ПУТИ</span>
            <span className={s.value}>{`${flight.depart.dateStart}-${flight.depart.dateEnd}`}</span>
          </div>
          <div className={s.detail}>
            <span className={s.title}>{`${flight.depart.layovers.length} пересадки`}</span>
            <span className={s.value}>{flight.depart.layovers.map((layover) => layover)}</span>
          </div>
        </div>
        <div className={s.return}>
          <div className={s.detail}>
            <span className={s.title}>{`MOW-MOW`}</span>
            <span className={s.value}>{`${flight.depart.dateStart}-${flight.depart.dateEnd}`}</span>
          </div>
          <div className={s.detail}>
            <span className={s.title}>В ПУТИ</span>
            <span className={s.value}>{`${flight.depart.dateStart}-${flight.depart.dateEnd}`}</span>
          </div>
          <div className={s.detail}>
            <span className={s.title}>{`${flight.depart.layovers.length} пересадки`}</span>
            <span className={s.value}>{flight.depart.layovers.map((layover) => layover)}</span>
          </div>
        </div>
      </div>
    </li>
  );
});
