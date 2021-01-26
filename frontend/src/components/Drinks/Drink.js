const Drink = ({ drink }) => {
  return (
    <div className="tw-p-4">
      <img src={drink.imageUrl} alt={drink.name} />
      <h1>{drink.name}</h1>
      <p>{drink.description}</p>
    </div>
  );
};

export default Drink;
