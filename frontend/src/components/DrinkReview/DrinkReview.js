import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateReview } from '../..store/drinks';

const DrinkReview = ({ reviewObj }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateReview({ userId, drinkId, review, rating }));
    setEditMode(false);
    dispatch(getDrinks());
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <div key={review.id}>
      <p>{review.review}</p>
    </div>
  );
};

export default DrinkReview;
