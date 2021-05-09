import { csrfFetch } from './csrf';
import { SET_USER } from './users';

export const SET_DRINK = 'drinks/SET_DRINK';
const SET_DRINKS = 'drinks/SET_DRINKS';
const REMOVE_DRINK = 'drinks/REMOVE_DRINK';

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  drinks,
});

const setDrink = ({ drink, reviews }) => ({
  type: SET_DRINK,
  drink,
  reviews,
});

const removeDrink = (id) => ({
  type: REMOVE_DRINK,
  id,
});

export const getDrinks = () => async (dispatch) => {
  const response = await csrfFetch('/api/drinks');
  if (response.ok) {
    dispatch(setDrinks(response.data));
  }
  return response;
};

export const getDrinkById = (drinkId) => async (dispatch) => {
  const response = await csrfFetch(`/api/drinks/${drinkId}`);
  if (response.ok) {
    dispatch(setDrink(response.data));
  }
  return response;
};

export const grabDrinks = (query) => async (dispatch) => {
  const response = await csrfFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const drinks = response.data.drinks;
  const res = await csrfFetch('/api/drinks/newDrinks', {
    method: 'POST',
    body: JSON.stringify({ drinks }),
  });
  dispatch(setDrinks(res.data));
};

export const mixDrink = (drink) => async (dispatch) => {
  const { image, name, description } = drink;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const response = await csrfFetch('/api/drinks', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(setDrink(response.data.drink));
    return response;
  } catch (err) {
    return err;
  }
};

export const updateDrink = ({ id, name, description, image }) => async (dispatch) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const response = await csrfFetch(`/api/drinks/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(setDrink(response.data.drink));
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteDrink = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/drinks/${id}`, {
      method: 'DELETE',
    });
    await dispatch(removeDrink(id));
    return response;
  } catch (err) {
    return err;
  }
};

const initialState = {
  byIds: {},
  allIds: [],
};

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
    case SET_DRINKS:
      return { ...state, byIds: { ...action.drinks }, allIds: Object.keys(action.drinks), };
    case SET_DRINK:
      return { ...state, byIds: { ...state.byIds, [action.drink.id]: action.drink }, allIds: [ ...state.allIds, action.drink.id ] };
    case REMOVE_DRINK:
      const newState = { ...state, byIds: { ...state.byIds }, allIds: state.allIds.filter((id) => id !== action.id) };
      delete newState.byIds[action.id];
      return newState;
    default:
      return state;
  }
};

export default drinksReducer;
