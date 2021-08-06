import { createContext, useReducer, useContext } from 'react';

const UserAuthContext = createContext();
export const useUserAuth = () => useContext(UserAuthContext);

const SHOW_LOGIN = 'showLogin';
const HIDE_LOGIN = 'hideLogin';
const SHOW_REGISTER = 'showRegister';
const HIDE_REGISTER = 'hideRegister';

const initialState = {
  showLoginModal: false,
  showRegisterModal: false,
};

const userAuthReducer = (state, action) => {
  switch (action.type) {
    case SHOW_LOGIN:
      return {
        ...state,
        showLoginModal: true,
      };
    case HIDE_LOGIN:
      return {
        ...state,
        showLoginModal: false,
      };
    case SHOW_REGISTER:
      return {
        ...state,
        showRegisterModal: true,
      };
    case HIDE_REGISTER:
      return {
        ...state,
        showRegisterModal: false,
      };
    default:
      return state;
  }
};

export default function UserAuthProvider({ children }) {
  const [state, dispatch] = useReducer(userAuthReducer, initialState);
  const { showLoginModal, showRegisterModal } = state;
  const setShowLoginModal = (bool) => bool ? dispatch({ type: SHOW_LOGIN }) : dispatch({ type: HIDE_LOGIN });
  const setShowRegisterModal = (bool) => bool ? dispatch({ type: SHOW_REGISTER }) : dispatch({ type: HIDE_REGISTER });

  return (
    <UserAuthContext.Provider value={{ showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal }}>
      { children }
    </UserAuthContext.Provider>
  );
}
