import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '../../context/Modal';
import DeleteConfirmation from './DeleteConfirmation';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import { updateReview, getDrinks } from '../../store/drinks';

const DrinkReview = ({ userId, drinkId, reviewObj }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState(reviewObj.review);
  const [rating, setRating] = useState(reviewObj.stars);
  const [errors, setErrors] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    const response = await dispatch(updateReview({ userId, drinkId, review, rating, reviewId: reviewObj.id }));
    if (response.data.errors && response.data.errors.length) {
      setErrors([]);
      setErrors((prev) => [...prev, ...response.data.errors]);
    } else {
      setEditMode(false);
      dispatch(getDrinks());
    }
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  if (editMode) {
    return (
      <>
        <div key={reviewObj.id}>
          <form onSubmit={submitClickHandler}>
            <ErrorsDiv errors={errors} />
            <textarea value={review} onChange={e => setReview(e.target.value)}></textarea>
            <input type="number" value={rating} onChange={e => setRating(e.target.value)} />
            <button type="submit">Re-submit Review</button>
          </form>
          <button onClick={editClickHandler} className="tw-border-2">Edit Review</button>
          <button onClick={deleteClickHandler} className="tw-border-2">Delete Review</button>
        </div>
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} id={reviewObj.id} />
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className="tw-p-2 tw-flex tw-flex-col tw-justify-center tw-border-2 tw-bg-gray-200 tw-w-1/3 tw-m-auto" key={reviewObj.id}>
        <p>{review} - by </p>
        <p>Rating: {rating} out of 5</p>
        <p>On {Date(reviewObj.updatedAt)}</p>
        {userId === reviewObj.userId && (
          <>
            <button onClick={editClickHandler} className="tw-border-2">Edit Review</button>
            <button onClick={deleteClickHandler} className="tw-border-2">Delete Review</button>
          </>
        )}
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} drinkId={drinkId} reviewId={reviewObj.id} />
        </Modal>
      )}
    </>
  );
};

export default DrinkReview;
