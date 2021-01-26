import { createContext, useState, useContext } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

export default function UserAuthProvider({ children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <UserAuthContext.Provider value={{ showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal }}>
      { children }
    </UserAuthContext.Provider>
  );
}
