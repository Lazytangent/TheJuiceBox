const DrinkReview = ({ review }) => {
  return (
    <div key={review.id}>
      <p>{review.review}</p>
    </div>
  );
};

export default DrinkReview;
