import { fetch } from './csrf';

const SET_DRINKS = 'drinks/SET_DRINKS';
const CREATE_DRINK = 'drinks/CREATE_DRINK';

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
    default:
      return state;
  }
};

export default drinksReducer;
