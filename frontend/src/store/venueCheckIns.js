import { csrfFetch } from './csrf';
import { SET_CHECK_IN, SET_CHECK_INS } from './constants';
import { setCheckIn, setCheckIns } from './actions';

export const getCheckIns = async (dispatch) => {
  const res = await csrfFetch('/api/checkIns');
  const checkIns = await res.json();
  dispatch(setCheckIns(checkIns));
  return checkIns;
};

export const getCheckIn = async (dispatch, venueId) => {
  const res = await csrfFetch(`/api/venues/${venueId}/checkIns`);
  const checkIn = await res.json();
  dispatch(setCheckIn(checkIn));
  return checkIn;
};

const initialState = {};

const checkInsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECK_INS:
      return { ...Object.fromEntries(action.checkIns.map((checkIn) => [checkIn.id, checkIn])) };
    case SET_CHECK_IN:
      return { ...state, [action.checkIn.id]: action.checkIn };
    default:
      return state;
  }
};

export default checkInsReducer;
