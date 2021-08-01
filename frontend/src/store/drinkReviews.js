import { csrfFetch } from './csrf';
import { SET_USER, CREATE_DRINK, SET_REVIEW, REMOVE_REVIEW } from './constants';

export const drinkReviewsSelector = (drinkId) => (state) => state.drinks.byIds[drinkId]?.Reviews?.map((reviewId) => state.drinkReviews.byIds[reviewId]);

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
    const res = await csrfFetch(`/api/drinks/${drinkId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ userId, drinkId, review, rating }),
    });
    const newReview = await res.json();
    dispatch(setReview(newReview));
    return res;
  } catch (err) {
    return err;
  }
};

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/drinks/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });
  const updatedReview = await res.json();
  dispatch(setReview(updatedReview));
  return res;
};

export const deleteReview = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/drinks/reviews/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeReview(id));
  }
};

const initialState = {
  byIds: {},
  allIds: [],
};

const drinkReviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
    case CREATE_DRINK:
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
