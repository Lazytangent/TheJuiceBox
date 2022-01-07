import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import UserAuthProvider from "./context/AuthContext";
import SearchProvider from "./context/SearchContext";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import * as sessionActions from "./store/session";
import * as drinkActions from "./store/drinks";
import * as userActions from "./store/users";
import * as venueActions from "./store/venues";
import * as checkInActions from "./store/venueCheckIns";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.drinkActions = drinkActions;
  window.userActions = userActions;
  window.venueActions = venueActions;
  window.checkInActions = checkInActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <UserAuthProvider>
          <SearchProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SearchProvider>
        </UserAuthProvider>
      </ModalProvider>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
