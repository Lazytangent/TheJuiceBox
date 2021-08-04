import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const DrinkDetailsCard = ({ drinkId, editClickHandler, deleteClickHandler }) => {
  const drink = useSelector((state) => state.drinks.byIds[drinkId]);
  const user = useSelector((state) => state.session.user);

  return (
    <div className="tw-rounded tw-grid-cols-3 tw-grid tw-p-8 tw-flex tw-flex-col tw-bg-gray-lightest tw-my-4 lg:tw-my-4 tw-items-center lg:tw-w-3/4 lg:tw-m-auto">
      <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-max-h-96">
        <img
          src={drink.imageUrl}
          alt={drink.name}
          className="tw-object-fill tw-max-w-60"
        />
      </div>
      <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
        <h3 className="tw-text-xl tw-font-bold">
          The {drink.name} - created by{" "}
          <Link className="hover:tw-underline" to={`/users/${drink.creatorId}`}>
            {drink.Creator?.username}
          </Link>
        </h3>
        <p>{drink.description}</p>
        {drink.creatorId === user?.id && (
          <div className="tw-w-2/4 tw-flex tw-flex-start">
            <button
              className="tw-p-1 tw-m-1 tw-border-2 tw-bg-yellow hover:tw-bg-yellow-dark tw-rounded"
              onClick={editClickHandler}
            >
              Edit
            </button>
            <button
              className="tw-p-1 tw-m-1 tw-border-2 tw-bg-red hover:tw-bg-red-dark tw-rounded"
              onClick={deleteClickHandler}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinkDetailsCard;
