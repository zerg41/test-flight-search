import React, { FC } from 'react';
// components
import { Copyright } from 'components';
// styles
import airplaneImage from 'assets/images/icons8-airplane-91.png';
import s from './styles.module.css';

let App: FC = () => {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <img className={s.logo} src={airplaneImage} alt='logo' width={60} height={60} />
      </header>
      <main className={s.main}>
        <div>Filter</div>
        <div>List</div>
      </main>
      <footer className={s.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default App;
