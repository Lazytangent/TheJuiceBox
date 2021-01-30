import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Drink from '../Drinks/Drink';
import { useSearchContext } from '../../context/SearchContext';
import { grabDrinks } from '../../store/drinks';

const SearchPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const query = location.search.split('=')[1];

  const drinks = useSelector((state) => state.drinks);
  const similar = Object.values(drinks).filter(drink => drink.name.toLowerCase().includes(query.toLowerCase()));

  if (!similar.length) {
    dispatch(grabDrinks(query));
  }

  const { setInput } = useSearchContext();

  useEffect(() => {
    setInput('');
  }, [setInput]);

  return (
    <div className="tw-bg-gray tw-max-w-7xl tw-mx-auto tw-p-2 tw-min-h-screen">
      <h2 className="tw-text-3xl tw-font-serif tw-font-semibold tw-text-center">Search Results</h2>
      {similar.map(drink => (
        <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
          <Drink drink={drink} />
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
