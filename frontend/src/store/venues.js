import { csrfFetch } from './csrf';
import { SET_VENUE, SET_VENUES } from './constants';
import { setVenue, setVenues } from './actions';

export const getVenues = () => async (dispatch) => {
  const res = await csrfFetch('/api/venues');
  const venues = await res.json();
  dispatch(setVenues(venues));
  return venues;
};

export const getVenue = (venueId) => async (dispatch) => {
  const res = await csrfFetch(`/api/venues/${venueId}`);
  const venue = await res.json();
  dispatch(setVenue(venue));
  return venue;
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
