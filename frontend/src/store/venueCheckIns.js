import { csrfFetch } from './csrf';
import { SET_CHECK_IN, SET_CHECK_INS } from './constants';
import { setCheckIn, setCheckIns } from './actions';

export const getCheckIns = async (dispatch) => {
  const res = await csrfFetch('/api/checkIns');
  const checkIns = await res.json();
  dispatch(setCheckIns(checkIns));
  return checkIns;
};

export const getUsersCheckIns = async (dispatch) => {
  const res = await csrfFetch('/api/users/checkIns');
  dispatch(setCheckIns(res.data));
  return res.data;
};

export const getCheckIn = async (dispatch, venueId) => {
  const res = await csrfFetch(`/api/venues/${venueId}/checkIns`);
  dispatch(setCheckIn(res.data));
  return res.data;
};

const initialState = {
  byIds: {},
  allIds: [],
};

const checkInsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_CHECK_INS:
      newState = { ...state, byIds: { ...state.byIds, ...action.checkIns } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case SET_CHECK_IN:
      newState = { ...state, byIds: { ...state.byIds, [action.checkIn.id]: action.checkIn } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    default:
      return state;
  }
};

export default checkInsReducer;
