import { csrfFetch } from './csrf';
import { SET_USER } from './users';
import { SET_DRINK } from './drinks';

export const drinkReviewsSelector = (drinkId) => (state) => state.drinks.byIds[drinkId]?.Reviews?.map((reviewId) => state.drinkReviews.byIds[reviewId]);

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

const initialState = {
  byIds: {},
  allIds: [],
};

const drinkReviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
    case SET_REVIEWS:
    case SET_DRINK:
      newState = { ...state, byIds: { ...state.byIds, ...action.reviews } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case SET_REVIEW:
      newState = { ...state, byIds: { ...state.byIds, [action.review.id]: action.review } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case REMOVE_REVIEW:
      newState = { ...state, byIds: { ...state.byIds }, allIds: state.allIds.filter((id) => id !== action.id) };
      delete newState.byIds[action.id];
      return newState;
    default:
      return state;
  }
};

export default drinkReviewsReducer;
