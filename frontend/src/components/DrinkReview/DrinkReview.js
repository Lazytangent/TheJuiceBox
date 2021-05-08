import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import DeleteConfirmation from './DeleteConfirmation';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import { getDrinks } from '../../store/drinks';
import { updateReview } from '../../store/drinkReviews';

const DrinkReview = ({ userId, drinkId, reviewObj }) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    const response = await dispatch(updateReview({ userId, drinkId, review, rating, id: reviewObj.id }));
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
        <div className="tw-items-center tw-p-2 tw-rounded tw-border-2 tw-bg-gray-light tw-w-2/3 md:tw-flex tw-justify-around tw-m-auto" key={reviewObj.id}>
          <div>
            <form onSubmit={submitClickHandler} className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
              <ErrorsDiv errors={errors} />
              <textarea value={review} onChange={e => setReview(e.target.value)} className="tw-p-1 tw-rounded tw-mx-1 tw-mb-2"></textarea>
              <input type="number" value={rating} onChange={e => setRating(e.target.value)} className="tw-p-1 tw-rounded tw-mx-1 tw-mb-2" />
              <button type="submit" className="tw-rounded tw-border-2 tw-bg-green hover:tw-bg-green-dark tw-p-1 tw-mb-1 tw-w-full">Re-submit Review</button>
            </form>
          </div>
          <div className="tw-flex tw-flex-col">
            <button onClick={editClickHandler} className="tw-my-1 tw-border-2 hover:tw-bg-yellow-dark tw-p-1 tw-rounded tw-bg-yellow">Edit Review</button>
            <button onClick={deleteClickHandler} className="tw-my-1 tw-border-2 hover:tw-bg-red-dark tw-bg-red tw-p-1 tw-rounded">Delete Review</button>
          </div>
        </div>
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} reviewId={reviewObj.id} />
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className="tw-rounded tw-items-center tw-p-2 tw-mb-2 tw-flex tw-justify-around tw-border-2 tw-bg-gray-light tw-w-2/3 tw-m-auto" key={reviewObj.id}>
        <div className="md:tw-w-full">
          {location.pathname.startsWith('/users') ? <p>{review} - by {reviewObj.User.username}</p> : (
            <p>{review} - by <Link to={`/users/${reviewObj.User.id}`} className="hover:tw-underline">{reviewObj.User.username}</Link></p>
          )}
          <hr />
          <p className="tw-font-bold">{rating} out of 5 stars</p>
          <p>On {new Date(reviewObj.updatedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        {userId === reviewObj.userId && (
          <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-w-1/3">
            <button onClick={editClickHandler} className="tw-m-1 tw-p-1 tw-border-2 tw-rounded hover:tw-bg-yellow-dark tw-bg-yellow">Edit Review</button>
            <button onClick={deleteClickHandler} className="tw-m-1 tw-p-1 tw-rounded tw-border-2 hover:tw-bg-red-dark tw-bg-red">Delete Review</button>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} reviewId={reviewObj.id} />
        </Modal>
      )}
    </>
  );
};

export default DrinkReview;
