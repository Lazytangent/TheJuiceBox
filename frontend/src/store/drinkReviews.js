import { csrfFetch } from './csrf';
import { SET_USER } from './users';

const SET_REVIEWS = 'drinkReviews/SET_REVIEWS';
const SET_REVIEW = 'drinkReviews/SET_REVIEW';
const REMOVE_REVIEW = 'drinkReviews/REMOVE_REVIEW';

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

const setReview = (review) => ({
  type: SET_REVIEW,
  review,
});

const removeReview = (id) => ({
  type: REMOVE_REVIEW,
  id,
});

export const getReviews = (drinkId) => async (dispatch) => {
  const res = await csrfFetch(`/api/drinks/${drinkId}/reviews`);
  dispatch(setReviews(res.data));
};

export const writeReview = ({ userId, drinkId, review, rating }) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/drinks/${drinkId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ userId, drinkId, review, rating }),
    });

    dispatch(setReview(response.data));
    return response;
  } catch (err) {
    return err;
  }
};

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/drinks/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });
  dispatch(setReview(res.data));
  return res;
};

export const deleteReview = (id) => async (dispatch) => {
  await csrfFetch(`/api/drinks/reviews/${id}`, {
    method: "DELETE",
  });
  dispatch(removeReview(id));
};

const initialState = {};

const drinkReviewsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
    case SET_REVIEWS:
      return { ...state, ...action.reviews };
    case SET_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case REMOVE_REVIEW:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default drinkReviewsReducer;
