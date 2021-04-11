const SET_CHECK_IN = 'venueCheckIns/SET_CHECK_IN';
const SET_CHECK_INS = 'venueCheckIns/SET_CHECK_INS';

const setCheckIn = (checkIn) => ({
  type: SET_CHECK_IN,
  checkIn,
});

const setCheckIns = (checkIns) => ({
  type: SET_CHECK_INS,
  checkIns,
});

export const getCheckIns = async (dispatch) => {
  const res = await fetch('/api/checkIns');
  const checkIns = await res.json();
  dispatch(setCheckIns(checkIns));
  return checkIns;
};

export const getCheckIn = async (dispatch, venueId) => {
  const res = await fetch(`/api/venues/${venueId}/checkIns`);
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
