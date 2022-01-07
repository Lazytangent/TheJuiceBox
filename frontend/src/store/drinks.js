import { csrfFetch } from "./csrf";
import {
  SET_USER,
  SET_DRINKS,
  CREATE_DRINK,
  REMOVE_DRINK,
  SET_REVIEW,
  REMOVE_REVIEW,
} from "./constants";
import { setDrinks, createDrink, removeDrink } from "./actions";

export const getDrinks = () => async (dispatch) => {
  const res = await csrfFetch("/api/drinks");
  const drinks = await res.json();
  if (res.ok) {
    dispatch(setDrinks(drinks));
  }
  return drinks;
};

export const getDrinkById = (drinkId) => async (dispatch) => {
  const res = await csrfFetch(`/api/drinks/${drinkId}`);
  const { drink, reviews } = await res.json();
  if (res.ok) {
    dispatch(createDrink(drink, reviews));
  }
  return drink;
};

export const grabDrinks = (query) => async (dispatch) => {
  const response = await csrfFetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
  );
  const drinks = response.data.drinks;
  const res = await csrfFetch("/api/drinks/newDrinks", {
    method: "POST",
    body: JSON.stringify({ drinks }),
  });
  const drinksFromDatabase = await res.json();
  dispatch(setDrinks(drinksFromDatabase));
};

export const mixDrink = (drink) => async (dispatch) => {
  const { image, name, description } = drink;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const res = await csrfFetch("/api/drinks", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const newDrink = await res.json();
    dispatch(createDrink(newDrink));
    return newDrink;
  } catch (err) {
    return err;
  }
};

export const updateDrink = ({ id, name, description, image }) => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const res = await csrfFetch(`/api/drinks/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { drink, reviews, errors } = await res.json();
    dispatch(createDrink(drink, reviews));
    return errors;
  } catch (err) {
    return err;
  }
};

export const deleteDrink = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/drinks/${id}`, {
      method: "DELETE",
    });
    await dispatch(removeDrink(id));
    return response;
  } catch (err) {
    return err;
  }
};

const initialState = {
  allIds: [],
  byIds: {},
};

const drinksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
    case SET_DRINKS:
      newState = { ...state, byIds: { ...action.payload.drinks } };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case CREATE_DRINK:
      newState = {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.drink.id]: action.payload.drink,
        },
      };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case REMOVE_DRINK:
      newState = {
        ...state,
        byIds: { ...state.byIds },
        allIds: state.allIds.filter((id) => parseInt(id, 10) !== action.id),
      };
      delete newState.byIds[action.id];
      return newState;
    case SET_REVIEW:
      newState = {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.drinkId]: {
            ...state.byIds[action.payload.drinkId],
            Reviews: Array.from(
              new Set([
                ...state.byIds[action.payload.drinkId].Reviews,
                action.payload.review.id,
              ])
            ),
          },
        },
      };
      newState.allIds = Object.keys(newState.byIds);
      return newState;
    case REMOVE_REVIEW:
      newState = {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.drinkId]: {
            ...state.byIds[action.payload.drinkId],
            Reviews: state.byIds[action.payload.drinkId].Reviews.filter(
              (id) => id !== action.payload.id
            ),
          },
        },
      };
      return newState;
    default:
      return state;
  }
};

export default drinksReducer;
