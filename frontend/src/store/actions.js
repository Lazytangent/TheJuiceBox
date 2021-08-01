import {
  SET_SESSION,
  REMOVE_SESSION,
  SET_DRINKS,
  CREATE_DRINK,
  REMOVE_DRINK,
  SET_USER,
  SET_CHECK_IN,
  SET_CHECK_INS,
  SET_VENUE,
  SET_VENUES,
} from './constants';

export const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

export const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const setDrinks = (drinks) => {
  return {
    type: SET_DRINKS,
    drinks,
  };
};

export const createDrink = (drink) => {
  return {
    type: CREATE_DRINK,
    drink,
  };
};

export const removeDrink = (id) => {
  return {
    type: REMOVE_DRINK,
    id,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setCheckIn = (checkIn) => ({
  type: SET_CHECK_IN,
  checkIn,
});

export const setCheckIns = (checkIns) => ({
  type: SET_CHECK_INS,
  checkIns,
});

export const setVenues = (venues) => ({
  type: SET_VENUES,
  venues,
});

export const setVenue = (venue) => ({
  type: SET_VENUE,
  venue,
});
