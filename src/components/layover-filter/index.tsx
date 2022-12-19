import React, { FC } from 'react';
// store
import { observer } from 'mobx-react-lite';
import { store } from 'store';
// styles
import s from './styles.module.css';
// utils
import { ELayoverFilterOption } from 'utils/constants';

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
      <h3 className={s.title}>{'Количество пересадок'.toUpperCase()}</h3>
      <div className={s.option}>
        <input
          type='checkbox'
          id='all-flights'
          className={s.input}
          value={ELayoverFilterOption.ALL}
          onChange={handleSelectAllFilters}
          checked={store.isCheckedAll}
        />
        <label htmlFor='all-flights' className={s.label}>
          Все
        </label>
      </div>
      {store.filters.map((filter) => {
        return (
          <div key={filter.id} className={s.option}>
            <input
              type='checkbox'
              id={filter.id}
              className={s.input}
              value={filter.value}
              onChange={filter.setFilter}
              checked={filter.isChecked}
            />
            <label htmlFor={filter.id} className={s.label}>
              {filter.title}
            </label>
          </div>
        );
      })}
    </div>
  );
});
