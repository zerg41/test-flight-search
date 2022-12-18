import React, { FC } from 'react';
// store
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { store } from 'store';
// components
import { Copyright, LayoverFilter, SortSwitch } from 'components';
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

        <div>
          <SortSwitch />
          {values(store.tickets).map((ticket) => (
            <p key={ticket.id}>{ticket.price}</p>
          ))}
        </div>
      </main>
      <footer className={s.footer}>
        <Copyright />
      </footer>
    </div>
  );
});

export default App;
