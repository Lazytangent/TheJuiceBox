import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/drinkReviews";

const DeleteConfirmation = ({ reviewId, setShowDeleteModal }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteReview(reviewId));
    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="tw-bg-white tw-p-8 tw-rounded">
      <h2>Are you sure you want to delete this review?</h2>
      <div className="tw-p-1 tw-flex tw-justify-around">
        <button
          className="tw-rounded tw-p-1 tw-border tw-bg-red hover:tw-bg-red-dark"
          onClick={onClick}
        >
          Yes
        </button>
        <button
          className="tw-rounded tw-p-1 tw-border tw-bg-blue hover:tw-bg-blue-dark"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
