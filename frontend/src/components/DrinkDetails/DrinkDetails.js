import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DrinkDetails = () => {
  const { drinkId } = useParams();
  const drink = useSelector(state => state.drinks[drinkId]);
  console.log(drink);

  return (
    <div className="tw-p-8">
      <h1>Drink Details</h1>
    </div>
  );
};

export default DrinkDetails;
