import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import drinksReducer from "./drinks";
import drinkReviewsReducer from "./drinkReviews";
import usersReducer from "./users";
import venuesReducer from "./venues";
import checkInsReducer from "./venueCheckIns";

const rootReducer = combineReducers({
  session: sessionReducer,
  drinks: drinksReducer,
  drinkReviews: drinkReviewsReducer,
  users: usersReducer,
  venues: venuesReducer,
  checkIns: checkInsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
