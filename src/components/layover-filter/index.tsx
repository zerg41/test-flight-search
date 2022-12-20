import React, { FC } from 'react';
// store
import { observer } from 'mobx-react-lite';
import { store } from 'store';
// styles
import s from './styles.module.css';
// utils
import { ELayoverOption } from 'utils/constants';

export const LayoverFilter: FC = observer(() => {
  function handleSelectAllFilters() {
    if (store.isCheckedAll) {
      store.resetAllFilters();
      return;
    }
    store.setAllFilters();
  }

  return (
    <div className={s.filter} role='menu'>
      <h3 className={s.title}>Количество пересадок</h3>
      <div className={s.option}>
        <input
          type='checkbox'
          id='all-flights'
          className={s.input}
          value={ELayoverOption.ALL}
          onChange={handleSelectAllFilters}
          checked={store.isCheckedAll}
        />
        <label htmlFor='all-flights' className={s.label}>
          Все
        </label>
      </div>
      {store.layoverFilterOptions.map((option) => {
        return (
          <div key={option.id} className={s.option}>
            <input
              type='checkbox'
              id={option.id}
              className={s.input}
              value={option.value}
              onChange={option.setFilter}
              checked={option.isChecked}
            />
            <label htmlFor={option.id} className={s.label}>
              {option.title}
            </label>
          </div>
        );
      })}
    </div>
  );
});
