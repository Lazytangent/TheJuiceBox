import { csrfFetch } from './csrf';

const SET_USER = 'users/SET_USER';

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
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
      return action.user;
    default:
      return state;
  }
};

export default usersReducer;
