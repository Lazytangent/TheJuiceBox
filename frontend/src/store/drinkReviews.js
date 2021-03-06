import { csrfFetch } from './csrf';
import { SET_USER } from './users';
import { SET_DRINK } from './drinks';

export const drinkReviewsSelector = (drinkId) => (state) => state.drinks.byIds[drinkId]?.Reviews?.map((reviewId) => state.drinkReviews.byIds[reviewId]);

const SET_REVIEW = 'drinkReviews/SET_REVIEW';
const REMOVE_REVIEW = 'drinkReviews/REMOVE_REVIEW';

const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});

const removeReview = (id) => ({
  type: REMOVE_REVIEW,
  payload: id,
});

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
    case SET_DRINK:
      newState = { ...state, byIds: { ...state.byIds, ...action.payload.reviews } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case SET_REVIEW:
      newState = { ...state, byIds: { ...state.byIds, [action.payload.id]: action.payload } };
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
