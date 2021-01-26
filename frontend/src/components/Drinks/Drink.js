import { Link } from 'react-router-dom';

const Drink = ({ drink }) => {
  return (
    <div className="tw-bg-indigo-300 tw-grid-cols-3 tw-grid lg:tw-w-2/4">
      <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-col-start-1 tw-max-h-96">
        <Link to={`/drinks/${drink.id}`}>
          <img src={drink.imageUrl} alt={drink.name} className="tw-object-fill tw-max-h-60"/>
        </Link>
      </div>
      <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
        <Link to={`/drinks/${drink.id}`}>
          <h1 className="tw-font-serif tw-text-xl tw-font-semibold">{drink.name}</h1>
        </Link>
        <p>{drink.description}</p>
      </div>
    </div>
  );
};

export default Drink;
