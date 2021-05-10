import { csrfFetch } from './csrf';

export const userSelector = (userId) => (state) => state.users.byIds[userId];
export const usersDrinksSelector = (userId) => (state) => state.users[userId].Drinks.map((drinkId) => state.drinks.byIds[drinkId]);
export const usersReviewsSelector = (userId) => (state) => state.users[userId].DrinkReviews.map((reviewId) => state.drinkReviews.byIds[reviewId]);

export const SET_USER = 'users/SET_USER';

const setUser = ({ user, drinks, reviews }) => {
  return {
    type: SET_USER,
    user,
    drinks,
    reviews,
  };
};

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`);
    dispatch(setUser(response.data));
    return response;
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
      newState = { ...state, byIds: { ...state.byIds, [action.user.id]: action.user } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
