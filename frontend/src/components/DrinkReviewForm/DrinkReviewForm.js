import { useState } from 'react';

const DrinkReviewForm = () => {
  const [review, setReview] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea value={review} onChange={e => setReview(e.target.value)}></textarea>
      </form>
    </div>
  );
};

export default DrinkReviewForm;
