import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Drink from './Drink';
import { getDrinks } from '../../store/drinks';

const Drinks = () => {
  const dispatch = useDispatch();
  const drinksObj = useSelector(state => state.drinks);

  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(getDrinks())
  //     .then(() => setIsLoaded(true));
  //   return () => setIsLoaded(false);
  // }, [dispatch]);

  return (
    <div className="tw-p-8">
      <h1 className="tw-text-4xl tw-text-center tw-font-serif">All the Drinks</h1>
      {true && Object.values(drinksObj).map(drink => (
        <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
          <Drink drink={drink} />
        </div>)
      )}
    </div>
  );
};

export default Drinks;
