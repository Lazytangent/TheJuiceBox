import { csrfFetch } from './csrf';
import { SET_SESSION, REMOVE_SESSION } from './constants';
import { setSession, removeSession } from './actions';

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    const res = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const session = await res.json();
    dispatch(setSession(session));
    return res;
  } catch (err) {
    return err;
  }
};

export const restoreUser = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/session');
    const session = await res.json();
    dispatch(setSession(session));
    return res;
  } catch (err) {
    return err;
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const session = await res.json();
    dispatch(setSession(session));
    return res;
  } catch (err) {
    return err;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    if (res.ok) {
      dispatch(removeSession());
    }
    return res;
  } catch (err) {
    return err;
  }
};

export const demoLogin = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/session/demo', {
      method: 'POST',
      body: JSON.stringify({ credential: 'Demo-Dave', password: 'password' }),
    });
    const session = await res.json();
    dispatch(setSession(session));
    return res;
  } catch (err) {
    return err;
  }
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.user }
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
