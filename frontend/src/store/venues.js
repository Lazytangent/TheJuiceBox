import { csrfFetch } from './csrf';

const SET_VENUES = 'venues/SET_VENUES';
const SET_VENUE = 'venues/SET_VENUE';

const setVenues = (venues) => ({
  type: SET_VENUES,
  venues,
});

const setVenue = (venue) => ({
  type: SET_VENUE,
  venue,
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

const initialState = {};

const venuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VENUES:
      return { ...Object.fromEntries(action.venues.map((venue) => [venue.id, venue])) };
    case SET_VENUE:
      return { ...state, [action.venue.id]: action.venue };
    default:
      return state;
  }
};

export default venuesReducer;
