import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { drinks } from '../../store/selectors';
import { getDrinks } from '../../store/drinks';
import Drink from './Drink';
import SearchBar from "../Navigation/SearchBar";

const Drinks = () => {
  const dispatch = useDispatch();
  const drinkIds = useSelector(drinks.allIds());

  useEffect(() => {
    dispatch(getDrinks());
  }, [dispatch]);

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-p-2 tw-min-h-screen">
      <div className="tw-flex tw-justify-center md:tw-hidden tw-p-2">
        <SearchBar />
      </div>
      <h1 className="tw-text-clouds tw-text-5xl tw-font-semibold tw-text-center">All the Drinks</h1>
      {drinkIds.map(drinkId => (
        <div className="tw-flex tw-justify-center tw-p-4" key={drinkId}>
          <Drink drinkId={drinkId} />
        </div>)
      )}
    </div>
  );
};

export default Drinks;
