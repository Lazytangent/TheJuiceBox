import {
  SET_SESSION,
  REMOVE_SESSION,
  SET_DRINKS,
  CREATE_DRINK,
  REMOVE_DRINK,
  SET_REVIEW,
  REMOVE_REVIEW,
  SET_USER,
  SET_CHECK_IN,
  SET_CHECK_INS,
  SET_VENUE,
  SET_VENUES,
} from "./constants";

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
    payload: {
      drinks,
    },
  };
};

export const createDrink = (drink, reviews) => {
  return {
    type: CREATE_DRINK,
    payload: {
      drink,
      reviews,
    },
  };
};

export const removeDrink = (id) => {
  return {
    type: REMOVE_DRINK,
    id,
  };
};

export const setReview = (review, drinkId) => ({
  type: SET_REVIEW,
  payload: {
    review,
    drinkId,
  },
});

export const removeReview = (id, drinkId) => ({
  type: REMOVE_REVIEW,
  payload: {
    id,
    drinkId,
  },
});

export const setUser = ({ user, drinks, reviews }) => ({
  type: SET_USER,
  payload: {
    user,
    drinks,
    reviews,
  },
});

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
