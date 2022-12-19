import React, { FC } from 'react';
// store
import { observer } from 'mobx-react-lite';
// components
import { Copyright, LayoverFilter, SortSwitch, FlightList } from 'components';
// styles
import airplaneImage from 'assets/images/icons8-airplane-91.png';
import s from './styles.module.css';

let App: FC = observer(() => {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <img className={s.logo} src={airplaneImage} alt='logo' width={60} height={60} />
      </header>
      <main className={s.main}>
        <LayoverFilter />
        <section className={s.flights}>
          <SortSwitch />
          <FlightList />
        </section>
      </main>
      <footer className={s.footer}>
        <Copyright />
      </footer>
    </div>
  );
});

export default App;
