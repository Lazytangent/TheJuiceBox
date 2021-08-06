import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { drinkReviews, session } from "../../store/selectors";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditReviewForm from "./EditReview";

const DrinkReview = ({ reviewId }) => {
  const location = useLocation();
  const reviewObj = useSelector(drinkReviews.byId(reviewId));
  const { id: userId } = useSelector(session.user());

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  if (editMode) {
    return (
      <EditReviewForm
        reviewId={reviewId}
        setEditMode={setEditMode}
        editClickHandler={editClickHandler}
        deleteClickHandler={deleteClickHandler}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    );
  }

  return (
    <>
      <div
        className="tw-rounded tw-items-center tw-p-2 tw-mb-2 tw-flex tw-justify-around tw-border-2 tw-bg-gray-light tw-w-2/3 tw-m-auto"
        key={reviewObj.id}
      >
        <div className="md:tw-w-full">
          {location.pathname.startsWith("/users") ? (
            <p>
              {reviewObj.review} - by {reviewObj.User.username}
            </p>
          ) : (
            <p>
              {reviewObj.review} - by{" "}
              <Link
                to={`/users/${reviewObj.User.id}`}
                className="hover:tw-underline"
              >
                {reviewObj.User.username}
              </Link>
            </p>
          )}
          <hr />
          <p className="tw-font-bold">{reviewObj.stars} out of 5 stars</p>
          <p>
            On{" "}
            {new Date(reviewObj.updatedAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {userId === reviewObj.userId && (
          <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-w-1/3">
            <button
              onClick={editClickHandler}
              className="tw-m-1 tw-p-1 tw-border-2 tw-rounded hover:tw-bg-yellow-dark tw-bg-yellow"
            >
              Edit Review
            </button>
            <button
              onClick={deleteClickHandler}
              className="tw-m-1 tw-p-1 tw-rounded tw-border-2 hover:tw-bg-red-dark tw-bg-red"
            >
              Delete Review
            </button>
          </div>
        )}
      </div>
      <DeleteConfirmationModal reviewId={reviewObj.id} />
    </>
  );
};

export default DrinkReview;
