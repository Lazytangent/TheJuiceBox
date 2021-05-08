import { csrfFetch } from './csrf';

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

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
};

export default usersReducer;
