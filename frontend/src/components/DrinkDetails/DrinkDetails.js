import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import EditModal from "./EditModal";
import DrinkReview from "../DrinkReview";
import DrinkReviewModal from "../DrinkReviewForm";
import DrinkDetailsCard from "./DrinkDetailsCard";
import { getDrinkById } from "../../store/drinks";
import { drinkReviewsSelector } from "../../store/drinkReviews";

const DrinkDetails = () => {
  const dispatch = useDispatch();
  const { drinkId } = useParams();
  const drink = useSelector((state) => state.drinks.byIds[drinkId]);
  const user = useSelector((state) => state.session.user);
  const drinkReviews = useSelector(drinkReviewsSelector(drinkId));

  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDrinkReview, setShowDrinkReview] = useState(false);

  useEffect(() => {
    dispatch(getDrinkById(drinkId));
  }, [dispatch, drinkId]);

  useEffect(() => {
    if (drink && user) setIsLoaded(true);
  }, [drink, user]);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="tw-min-h-full tw-bg-gray tw-max-w-7xl tw-mx-auto tw-p-2">
      <h1 className="tw-text-center tw-text-5xl tw-font-semibold">
        Drink No. {drink.id} Details
      </h1>
      <DrinkDetailsCard
        drinkId={drinkId}
        editClickHandler={editClickHandler}
        deleteClickHandler={deleteClickHandler}
      />
      {user && user.id !== drink.creatorId && (
        <DrinkReviewModal
          showDrinkReview={showDrinkReview}
          setShowDrinkReview={setShowDrinkReview}
          userId={user.id}
          drinkId={drink.id}
        />
      )}
      <hr className="tw-border-white" />
      <div className="tw-p-2">
        <h2 className="tw-text-center tw-text-2xl">Reviews</h2>
        {drinkReviews?.map((review) => (
          <DrinkReview
            userId={user.id}
            drinkId={drink.id}
            key={review.id}
            reviewObj={review}
          />
        ))}
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation
            setShowDeleteModal={setShowDeleteModal}
            id={drink.id}
          />
        </Modal>
      )}
      {editMode && (
        <Modal onClose={() => setEditMode(false)}>
          <EditModal
            drink={drink}
            user={user}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setIsLoaded={setIsLoaded}
            setEditMode={setEditMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default DrinkDetails;
