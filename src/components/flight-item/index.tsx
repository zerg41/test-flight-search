import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IFlight } from 'store';

type FlightItemProps = {
  flight: IFlight;
};

export const FlightItem: FC<FlightItemProps> = observer(({ flight }) => {
  return <div>{flight.price}</div>;
});
