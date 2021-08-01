import { csrfFetch } from './csrf';
import { SET_USER } from './constants';
import { setUser } from './actions';

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`);
    dispatch(setUser(response.data.user));
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
