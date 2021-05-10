import { csrfFetch } from './csrf';

export const userSelector = (userId) => (state) => state.users.byIds[userId];
export const usersDrinksSelector = (userId) => (state) => state.users.byIds[userId]?.Drinks?.map((drinkId) => state.drinks.byIds[drinkId]);
export const usersReviewsSelector = (userId) => (state) => state.users.byIds[userId]?.DrinkReviews?.map((reviewId) => state.drinkReviews.byIds[reviewId]);

export const SET_USER = 'users/SET_USER';

const setUser = ({ user, drinks, reviews }) => ({
  type: SET_USER,
  payload: {
    user,
    drinks,
    reviews,
  },
});

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
      newState = { ...state, byIds: { ...state.byIds, [action.payload.user.id]: action.payload.user } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
