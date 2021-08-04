import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateReview } from "../../store/drinkReviews";
import { drinkReviews } from "../../store/selectors";
import ErrorsDiv from "../Parts/Forms/ErrorsDiv";
import DeleteConfirmation from "./DeleteConfirmation";
import { Modal } from "../../context/Modal";

const EditReview = ({
  reviewId,
  setEditMode,
  editClickHandler,
  deleteClickHandler,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  const dispatch = useDispatch();
  const reviewObj = useSelector(drinkReviews.byId(reviewId));

  const [review, setReview] = useState(reviewObj.review);
  const [rating, setRating] = useState(reviewObj.stars);
  const [errors, setErrors] = useState([]);

  const submitClickHandler = async (e) => {
    e.preventDefault();
    const updatedReview = await dispatch(
      updateReview({ ...reviewObj, review, rating })
    );
    if (updatedReview?.errors) {
      setErrors([]);
      setErrors((prev) => [...prev, ...updatedReview?.errors]);
    } else {
      setEditMode(false);
    }
  };

  return (
    <>
      <div
        className="tw-items-center tw-p-2 tw-rounded tw-border-2 tw-bg-gray-light tw-w-2/3 md:tw-flex tw-justify-around tw-m-auto"
        key={reviewObj.id}
      >
        <div>
          <form
            onSubmit={submitClickHandler}
            className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center"
          >
            <ErrorsDiv errors={errors} />
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="tw-p-1 tw-rounded tw-mx-1 tw-mb-2"
            ></textarea>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="tw-p-1 tw-rounded tw-mx-1 tw-mb-2"
            />
            <button
              type="submit"
              className="tw-rounded tw-border-2 tw-bg-green hover:tw-bg-green-dark tw-p-1 tw-mb-1 tw-w-full"
            >
              Re-submit Review
            </button>
          </form>
        </div>
        <div className="tw-flex tw-flex-col">
          <button
            onClick={editClickHandler}
            className="tw-my-1 tw-border-2 hover:tw-bg-yellow-dark tw-p-1 tw-rounded tw-bg-yellow"
          >
            Edit Review
          </button>
          <button
            onClick={deleteClickHandler}
            className="tw-my-1 tw-border-2 hover:tw-bg-red-dark tw-bg-red tw-p-1 tw-rounded"
          >
            Delete Review
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation
            setShowDeleteModal={setShowDeleteModal}
            reviewId={reviewObj.id}
          />
        </Modal>
      )}
    </>
  );
};

export default EditReview;
