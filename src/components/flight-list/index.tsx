import React, { FC } from 'react';
// store
import { store } from 'store';
// components
import { FlightListItem } from 'components';
import { observer } from 'mobx-react-lite';
// styles
import s from './styles.module.css';

export const FlightList: FC = observer(() => {
  return (
    <ul className={s.list}>
      {store.filteredFlights.map((flight) => {
        return <FlightListItem key={flight.id} flight={flight} />;
      })}
    </ul>
  );
});
