const Drink = ({ drink }) => {
  return (
    <div className="tw-bg-indigo-300 tw-grid-cols-3 tw-grid">
      <div className="tw-col-span-1 tw-p-4 tw-col-start-1 tw-max-h-96">
        <img src={drink.imageUrl} alt={drink.name} className="tw-object-fill tw-max-h-60"/>
      </div>
      <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
        <h1 className="tw-font-serif tw-text-xl tw-font-semibold">{drink.name}</h1>
        <p>{drink.description}</p>
      </div>
    </div>
  );
};

export default Drink;
