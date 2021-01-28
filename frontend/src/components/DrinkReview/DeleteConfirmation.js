import { useDispatch } from 'react-redux';

import { deleteReview } from '../../store/drinks';

const DeleteConfirmation = ({ drinkId, reviewId, setShowDeleteModal }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteReview(drinkId, reviewId));
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="tw-bg-white tw-p-8 tw-rounded">
      <h2>Are you sure you want to delete this review?</h2>
      <div className="tw-p-1 tw-flex tw-justify-around">
        <button className="tw-p-1 tw-border hover:tw-bg-gray-300" onClick={onClick}>Yes</button>
        <button className="tw-p-1 tw-border hover:tw-bg-gray-300" onClick={closeModal}>No</button>
      </div>
    </div>
  )

};

export default DeleteConfirmation;
