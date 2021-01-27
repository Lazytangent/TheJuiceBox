import { useState } from 'react';

const DrinkReviewForm = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
