import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { Modal } from "../../context/Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import EditModal from './EditModal';
import DrinkReview from '../DrinkReview';
import DrinkReviewModal from '../DrinkReviewForm';
import { getDrinkById } from "../../store/drinks";
import { drinkReviewsSelector } from '../../store/drinkReviews';

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
      <h1 className="tw-text-center tw-text-5xl tw-font-semibold">Drink No. {drink.id} Details</h1>
      <div className="tw-rounded tw-grid-cols-3 tw-grid tw-p-8 tw-flex tw-flex-col tw-bg-gray-lightest tw-my-4 lg:tw-my-4 tw-items-center lg:tw-w-3/4 lg:tw-m-auto">
        <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-max-h-96">
          <img src={drink.imageUrl} alt={drink.name} className="tw-object-fill tw-max-w-60" />
        </div>
        <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
          <h3 className="tw-text-xl tw-font-bold">The {drink.name} - created by <Link className="hover:tw-underline" to={`/users/${drink.creatorId}`}>{drink.Creator && drink.Creator.username}</Link></h3>
          <p>{drink.description}</p>
          {user && drink.creatorId === user.id && (
            <div className="tw-w-2/4 tw-flex tw-flex-start">
              <button className="tw-p-1 tw-m-1 tw-border-2 tw-bg-yellow hover:tw-bg-yellow-dark tw-rounded" onClick={editClickHandler}>
                Edit
              </button>
              <button className="tw-p-1 tw-m-1 tw-border-2 tw-bg-red hover:tw-bg-red-dark tw-rounded" onClick={deleteClickHandler}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {user && user.id !== drink.creatorId && <DrinkReviewModal showDrinkReview={showDrinkReview} setShowDrinkReview={setShowDrinkReview} userId={user.id} drinkId={drink.id} />}
      <hr className="tw-border-white" />
      <div className="tw-p-2">
        <h2 className="tw-text-center tw-text-2xl">Reviews</h2>
        {drinkReviews?.map(review => <DrinkReview userId={user.id} drinkId={drink.id} key={review.id} reviewObj={review} />)}
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} id={drink.id} />
        </Modal>
      )}
      {editMode && (
        <Modal onClose={() => setEditMode(false)}>
          <EditModal drink={drink} user={user} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setIsLoaded={setIsLoaded} setEditMode={setEditMode} />
        </Modal>
      )}
    </div>
  );
};

export default DrinkDetails;
