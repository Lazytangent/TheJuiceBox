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
    <div className="tw-flex tw-items-center tw-justify-center">
      <h2 className="tw-text-xl tw-font-semibold tw-font-serif">Leave a Review:</h2>
      <form className="tw-py-4 tw-p-1 tw-flex tw-items-center" onSubmit={onSubmit}>
        <ErrorsDiv errors={errors} />
        <textarea placeholder="Type something here..." cols="40" rows="5" className="tw-p-1 tw-rounded tw-mx-1" value={review} onChange={e => setReview(e.target.value)}></textarea>
        <div>
          <label className="tw-p-1 tw-mx-1">Rating:</label>
          <input className="tw-p-1 tw-mx-1 tw-rounded" type="number" value={rating} onChange={e => setRating(e.target.value)} />
        </div>
        <button className="tw-rounded tw-mx-1 tw-border tw-bg-green hover:tw-bg-green-dark tw-p-1">Submit Review</button>
      </form>
    </div>
  );
};

export default DrinkReviewForm;
