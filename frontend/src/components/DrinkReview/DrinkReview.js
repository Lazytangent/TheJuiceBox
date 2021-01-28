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
      <div key={reviewObj.id}>
        <p>{review}</p>
        <p>{rating}</p>
        <button onClick={editClickHandler} className="tw-border-2">Edit Review</button>
        <button onClick={deleteClickHandler} className="tw-border-2">Delete Review</button>
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
