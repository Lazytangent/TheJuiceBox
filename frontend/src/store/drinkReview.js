import { fetch } from './csrf';

const SET_REVIEWS = 'drinkReview/SET_REVIEWS';
const CREATE_REVIEW = 'drinkReview/CREATE_REVIEW';
const REMOVE_REVIEW = 'drinkReview/REMOVE_REVIEW';

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const removeReview = (id) => {
  return {
    type: REMOVE_REVIEW,
    id,
  };
};

export const getReviews = (drinkId) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${drinkId}/reviews`);
  if (response.ok) {
    dispatch(setReviews(response.data.reviews));
    return response;
  }
};

export const writeReview = ({ userId, drinkId, review }) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${drinkId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ userId, drinkId, review }),
  });
  dispatch(createReview(response.data.review));
  return response.data.review;
};

export const updateReview = ({ userId, drinkId, review }) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${drinkId}/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify({ userId, drinkId, review }),
  });
  dispatch(createReview(response.data.review));
  return response.data.review;
}

export const deleteReview = (drinkId, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${drinkId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  dispatch(removeReview(reviewId));
  return response;
};

const initialState = {};

const drinkReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      const reviews = action.reviews.reduce((acc, ele) => {
        acc[ele.id] = ele;
        return acc;
      }, {});
      return { ...state, ...reviews };
    case CREATE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default drinkReviewsReducer;
