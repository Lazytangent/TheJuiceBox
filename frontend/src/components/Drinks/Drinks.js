import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Drink from './Drink';
import { getDrinks } from '../../store/drinks';

const Drinks = () => {
  const dispatch = useDispatch();
  const drinksObj = useSelector(state => state.drinks);

  const [isLoaded, setIsLoaded] = useState(false);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    dispatch(getDrinks())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      const newDrinks = Object.values(drinksObj).map(drink => <Drink key={drink.id} drink={drink} />);
      setDrinks(newDrinks);
    }
  }, [isLoaded, drinksObj]);

  return (
    <div className="tw-p-8">
      <h1>All the Drinks</h1>
      {isLoaded && (
        drinks
      )}
    </div>
  );
};

export default Drinks;
