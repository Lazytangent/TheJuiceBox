import { createContext, useReducer, useState, useContext } from 'react';

const UserAuthContext = createContext();
export const useUserAuth = () => useContext(UserAuthContext);

const SHOW_LOGIN = 'showLogin';
const HIDE_LOGIN = 'hideLogin';
const SHOW_REGISTER = 'showRegister';
const HIDE_REGISTER = 'hideRegister';

const initialState = {
  showLogin: false,
  showRegister: false,
};

const userAuthReducer = (state, action) => {
  switch (action.type) {
    case SHOW_LOGIN:
      return {
        ...state,
        showLogin: true,
      };
    case HIDE_LOGIN:
      return {
        ...state,
        showLogin: false,
      };
    case SHOW_REGISTER:
      return {
        ...state,
        showRegister: true,
      };
    case HIDE_REGISTER:
      return {
        ...state,
        showRegister: false,
      };
    default:
      return state;
  }
};

export default function UserAuthProvider({ children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const [state, dispatch] = useReducer(userAuthReducer, initialState);
  // const { showLoginModal, showRegisterModal } = state;
  // const setShowLoginModal = (bool) => bool ? dispatch({ type: SHOW_LOGIN }) : dispatch({ type: HIDE_LOGIN });
  // const setShowRegisterModal = (bool) => bool ? dispatch({ type: SHOW_REGISTER }) : dispatch({ type: HIDE_REGISTER });

  return (
    <UserAuthContext.Provider value={{ showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal }}>
      { children }
    </UserAuthContext.Provider>
  );
}
