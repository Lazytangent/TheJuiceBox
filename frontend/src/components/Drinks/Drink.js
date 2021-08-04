import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { drinks } from '../../store/selectors';

const Drink = ({ drinkId }) => {
  const drink = useSelector(drinks.byId(drinkId));

  return (
    <Link className="tw-rounded hover:tw-bg-gray-light tw-bg-gray tw-grid-cols-3 hover:tw-shadow-lg tw-grid lg:tw-w-3/4 tw-p-2" to={`/drinks/${drink.id}`}>
      <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-col-start-1 tw-max-h-96">
        <img src={drink.imageUrl} alt={drink.name} className="tw-object-fill tw-rounded tw-max-h-60" />
      </div>
      <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
        <h1 className="tw-text-xl tw-font-semibold">{drink.name}</h1>
        <p>{drink.description}</p>
      </div>
    </Link>
  );
};

export default Drink;
