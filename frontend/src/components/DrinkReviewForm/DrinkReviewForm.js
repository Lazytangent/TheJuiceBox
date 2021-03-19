import { useState } from "react";
import { useDispatch } from "react-redux";

import ErrorsDiv from "../Parts/Forms/ErrorsDiv";
import { writeReview } from "../../store/drinks";

const DrinkReviewForm = ({ setShowDrinkReview, userId, drinkId }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setShowDrinkReview(false);
    const response = await dispatch(
      writeReview({ userId, drinkId, review, rating })
    );
    if (response.data.errors && response.data.errors.length) {
      setErrors([]);
      setErrors((prev) => [...prev, ...response.data.errors]);
    }
  };

  return (
    <div className="tw-bg-gray tw-flex-col tw-p-4 tw-rounded tw-flex tw-items-center tw-justify-center">
      <h2 className="tw-text-xl tw-font-semibold">
        Leave a Review:
      </h2>
      <form
        className="tw-py-4 tw-p-1 tw-flex tw-flex-col tw-items-center"
        onSubmit={onSubmit}
      >
        <ErrorsDiv errors={errors} />
        <textarea
          placeholder="Type something here..."
          cols="40"
          rows="5"
          className="tw-my-1 tw-p-1 tw-rounded tw-mx-1"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div>
          <label className="tw-p-1 tw-mx-1">Rating:</label>
          <input
            className="tw-p-1 tw-mx-1 tw-rounded tw-my-1"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button className="tw-rounded tw-mx-1 tw-border-2 tw-my-1 tw-bg-green hover:tw-bg-green-dark tw-p-1">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default DrinkReviewForm;
