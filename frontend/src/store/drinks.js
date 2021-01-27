import { fetch } from './csrf';

const SET_DRINKS = 'drinks/SET_DRINKS';
const CREATE_DRINK = 'drinks/CREATE_DRINK';
const REMOVE_DRINK = 'drinks/REMOVE_DRINK';

const setDrinks = (drinks) => {
  return {
    type: SET_DRINKS,
    drinks,
  };
};

const createDrink = (drink) => {
  return {
    type: CREATE_DRINK,
    drink,
  };
};

const removeDrink = (id) => {
  return {
    type: REMOVE_DRINK,
    id,
  };
};

export const getDrinks = () => async (dispatch) => {
  const response = await fetch('/api/drinks');
  if (response.ok) {
    dispatch(setDrinks(response.data.drinks));
    return response;
  }
};

export const mixDrink = (drink) => async (dispatch) => {
  const { image, name, description } = drink;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);

  const response = await fetch('/api/drinks', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  dispatch(createDrink(response.data.drink));
  return response.data.drink;
};

export const updateDrink = ({ id, name, description, image }) => async (dispatch) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);

  const response = await fetch(`/api/drinks/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  dispatch(createDrink(response.data.drink));
  return response.data.drink;
};

export const deleteDrink = (id) => async (dispatch) => {
  await dispatch(removeDrink(id));
  const response = await fetch(`/api/drinks/${id}`, {
    method: 'DELETE',
  });
  return response.data.message;
};

const initialState = {};

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRINKS:
      const drinks = action.drinks.reduce((acc, ele) => {
        acc[ele.id] = ele;
        return acc;
      }, {});
      return { ...state, ...drinks };
    case CREATE_DRINK:
      return { ...state, [action.drink.id]: action.drink };
    case REMOVE_DRINK:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default drinksReducer;
