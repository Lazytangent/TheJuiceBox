import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Drink from '../Drinks/Drink';
import { useSearchContext } from '../../context/SearchContext';
import { grabDrinks, allDrinksSelector } from '../../store/drinks';

const SearchPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const query = location.search.split('=')[1];

  const drinks = useSelector(allDrinksSelector());
  const similar = drinks.filter(drink => drink.name.toLowerCase().includes(query.toLowerCase()));

  const [badQuery, setBadQuery] = useState(false);
  const { setInput } = useSearchContext();

  useEffect(() => {
    if (!similar.length) {
      dispatch(grabDrinks(query))
        .catch(() => setBadQuery(true));
    }
  }, [dispatch, query, similar.length]);

  useEffect(() => {
    setInput('');
  }, [setInput]);

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-p-2 tw-min-h-screen">
      <h2 className="tw-text-5xl tw-text-clouds tw-font-semibold tw-text-center">Search Results</h2>
      {badQuery && <h4 className="tw-text-3xl tw-text-clouds tw-text-center tw-mt-5">No Results Found</h4>}
      {similar.map(drink => (
        <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
          <Drink drink={drink} />
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
