import { useState } from 'react';
import { useDispatch } from 'react-redux';

import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import { writeReview } from '../../store/drinks';

const DrinkReviewForm = ({ userId, drinkId }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(writeReview({ userId, drinkId, review, rating }));
    if (response.data.errors && response.data.errors.length) {
      setErrors([]);
      setErrors((prev) => [...prev, ...response.data.errors]);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ErrorsDiv errors={errors} />
        <textarea value={review} onChange={e => setReview(e.target.value)}></textarea>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={e => setRating(e.target.value)} />
        </div>
        <button>Submit Review</button>
      </form>
    </div>
  );
};

export default DrinkReviewForm;
