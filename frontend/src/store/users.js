import { csrfFetch } from "./csrf";
import { SET_USER } from "./constants";
import { setUser } from "./actions";

export const userSelector = (userId) => (state) => state.users.byIds[userId];
export const usersDrinksSelector = (userId) => (state) =>
  state.users.byIds[userId]?.Drinks?.map(
    (drinkId) => state.drinks.byIds[drinkId]
  );
export const usersReviewsSelector = (userId) => (state) =>
  state.users.byIds[userId]?.DrinkReviews?.map(
    (reviewId) => state.drinkReviews.byIds[reviewId]
  );

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${id}`);
    const { user, drinks, reviews } = await res.json();
    dispatch(setUser({ user, drinks, reviews }));
    return res;
  } catch (err) {
    return err;
  }
};

const initialState = {
  byIds: {},
  allIds: [],
};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.user.id]: action.payload.user,
        },
      };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
