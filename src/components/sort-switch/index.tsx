import React, { FC, useEffect, useState } from 'react';
// store
import { store } from 'store';
// styles
import s from './styles.module.css';
// utils
import { ESortOption } from 'utils/constants';

export const SortSwitch: FC = () => {
  let [selectedSortOption, setSelectedSortOption] = useState<ESortOption>(ESortOption.PRICE);

  useEffect(() => {
    switch (selectedSortOption) {
      case ESortOption.PRICE:
        store.sortByPrice();
        break;
      case ESortOption.DURATION:
        store.sortByDuration();
        break;
    }
  }, [selectedSortOption]);

  function handleSortOptionChange(evt: React.FormEvent<HTMLInputElement>) {
    let sortOption = evt.currentTarget.value as ESortOption;
    setSelectedSortOption(sortOption);
  }

  return (
    <div role='radiogroup' className={s.switch}>
      <label className={`${s.label} ${selectedSortOption === ESortOption.PRICE ? s.checked : ''}`}>
        Самый дешевый
        <input
          type='radio'
          name='sort'
          className='visually-hidden'
          value={ESortOption.PRICE}
          defaultChecked={selectedSortOption === ESortOption.PRICE}
          onClick={handleSortOptionChange}
        />
      </label>
      <label
        className={`${s.label} ${selectedSortOption === ESortOption.DURATION ? s.checked : ''}`}
      >
        Самый быстрый
        <input
          type='radio'
          name='sort'
          className='visually-hidden'
          value={ESortOption.DURATION}
          defaultChecked={selectedSortOption === ESortOption.DURATION}
          onClick={handleSortOptionChange}
        />
      </label>
    </div>
  );
};
