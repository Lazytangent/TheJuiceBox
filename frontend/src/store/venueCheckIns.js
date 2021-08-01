import { csrfFetch } from './csrf';

const SET_CHECK_IN = 'venueCheckIns/SET_CHECK_IN';
const SET_CHECK_INS = 'venueCheckIns/SET_CHECK_INS';

const setCheckIn = (checkIn) => ({
  type: SET_CHECK_IN,
  payload: checkIn,
});

const setCheckIns = (checkIns) => ({
  type: SET_CHECK_INS,
  payload: checkIns,
});

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
