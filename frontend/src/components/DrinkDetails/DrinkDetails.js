import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getDrinks } from '../../store/drinks';

const DrinkDetails = () => {
  const dispatch = useDispatch();
  const { drinkId } = useParams();
  const drink = useSelector(state => state.drinks[drinkId]);
  const user = useSelector(state => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getDrinks()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  return (
    <div className="tw-p-8">
      <img src={drink.imageUrl} alt={drink.name} />
      <h1>Drink No. {drink.id} Details</h1>
      <h3>The {drink.name}</h3>
      <p>{drink.description}</p>
      {user && drink.creatorId === user.id && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
};

export default DrinkDetails;
