import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateReview, getDrinks } from '../../store/drinks';

const DrinkReview = ({ userId, drinkId, reviewObj }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    <div key={reviewObj.id}>
      <p>{reviewObj.review}</p>
    </div>
  );
};

export default DrinkReview;
