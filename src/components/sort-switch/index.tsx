import React, { FC, useState } from 'react';
// store
import { store } from 'store';
// styles
import s from './styles.module.css';

enum ESortOption {
  PRICE = 'price',
  DURATION = 'duration',
}

export const SortSwitch: FC = () => {
  let [selectedSortOption, setSelectedSortOption] = useState<ESortOption>(ESortOption.PRICE);

  function handleSortOptionChange(evt: React.FormEvent<HTMLInputElement>) {
    let sortOption = evt.currentTarget.value as ESortOption;

    switch (sortOption) {
      case ESortOption.PRICE:
        store.sortByPrice();
        break;
      case ESortOption.DURATION:
        store.sortByDuration();
        break;
    }

    setSelectedSortOption(sortOption);
  }

  return (
    <fieldset name='sort' role='radiogroup' className={s.group}>
      <label className={`${s.label} ${selectedSortOption === ESortOption.PRICE ? s.checked : ''}`}>
        Самый дешевый
        <input
          type='radio'
          name='sort'
          className='visually-hidden'
          value={ESortOption.PRICE}
          checked={selectedSortOption === ESortOption.PRICE}
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
          checked={selectedSortOption === ESortOption.DURATION}
          onClick={handleSortOptionChange}
        />
      </label>
    </fieldset>
  );
};
