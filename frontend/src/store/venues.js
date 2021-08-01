import { csrfFetch } from './csrf';

const SET_VENUES = 'venues/SET_VENUES';
const SET_VENUE = 'venues/SET_VENUE';

const setVenues = (venues) => ({
  type: SET_VENUES,
  payload: venues,
});

const setVenue = (venue) => ({
  type: SET_VENUE,
  payload: venue,
});

export const getVenues = async (dispatch) => {
  const res = await csrfFetch('/api/venues');
  dispatch(setVenues(res.data));
  return res.data;
};

export const getVenue = async (dispatch, venueId) => {
  const res = await csrfFetch(`/api/venues/${venueId}`);
  dispatch(setVenue(res.data));
  return res.data;
};

const initialState = {
  byIds: {},
  allIds: [],
};

const venuesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_VENUES:
      newState = { ...state, byIds: { ...state.byIds, ...action.payload } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case SET_VENUE:
      newState = { ...state, byIds: { ...state.byIds, [action.payload.id]: action.payload } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    default:
      return state;
  }
};

export default venuesReducer;
