import { fetch } from './csrf';

const GET_DRINKS = 'drinks/GET_DRINKS';
const SET_DRINK = 'drinks/MAKE_DRINK';

const getDrinks = () => {
  return {
    type: GET_DRINKS,
  };
};

const setDrink = (drink) => {
  return {
    type: SET_DRINK,
    drink,
  };
};

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default drinksReducer;
