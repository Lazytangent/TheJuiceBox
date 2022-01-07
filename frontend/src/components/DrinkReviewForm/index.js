import { Modal } from "../../context/Modal";
import DrinkReviewForm from "./DrinkReviewForm";

const DrinkReviewModal = ({
  userId,
  drinkId,
  showDrinkReview,
  setShowDrinkReview,
}) => {
  return (
    <div className="tw-p-1 tw-flex tw-justify-center tw-items-center tw-mb-3">
      <button
        className="tw-p-1 tw-border-2 tw-bg-green hover:tw-bg-green-dark tw-rounded"
        onClick={() => setShowDrinkReview(true)}
      >
        Drop a Review
      </button>
      {showDrinkReview && (
        <Modal onClose={() => setShowDrinkReview(false)}>
          <DrinkReviewForm
            userId={userId}
            drinkId={drinkId}
            setShowDrinkReview={setShowDrinkReview}
          />
        </Modal>
      )}
    </div>
  );
};

export default DrinkReviewModal;
