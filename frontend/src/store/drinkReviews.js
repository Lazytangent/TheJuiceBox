import { csrfFetch } from './csrf';

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

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/drink/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });
  dispatch(setReview(res.data));
};

export const deleteReview = (id) => async (dispatch) => {
  await csrfFetch(`/api/drink/reviews/${id}`, {
    method: "DELETE",
  });
  dispatch(removeReview(id));
};

const initialState = {};

const drinkReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default drinkReviewsReducer;
