import { FC } from 'react';
import s from './styles.module.css';

export const LayoverFilter: FC = () => {
  return (
    <fieldset className={s.filter}>
      <div className={s.title}>Количество пересадок</div>
      <div>
        <input type='checkbox' title='Все' className={s.input} />
      </div>

      {/* <input type='checkbox'>Без пересадок</input>
      <input type='checkbox'>1 пересадка</input>
      <input type='checkbox'>2 пересадки</input>
      <input type='checkbox'>3 пересадки</input> */}
    </fieldset>
  );
};
