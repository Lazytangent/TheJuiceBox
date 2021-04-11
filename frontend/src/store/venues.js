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
  const res = await fetch('/api/venues');
  const venues = await res.json();
  dispatch(setVenues(venues));
  return venues;
};

export const getVenue = async (dispatch, venueId) => {
  const res = await fetch(`/api/venues/${venueId}`);
  const venue = await res.json();
  dispatch(setVenue(venue));
  return venue;
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
