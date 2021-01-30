import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from './SearchBar';
import DrinkFormModal from '../DrinkForm';
import { logoutUser } from '../../store/session';
import { useUserAuth } from '../../context/AuthContext';

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { setShowLoginModal, setShowRegisterModal } = useUserAuth();
  const [showDrinkForm, setShowDrinkForm] = useState(false);
  const history = useHistory();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const openMenu = () => {
    if (showProfileMenu) return;
    setShowProfileMenu(true);
  };

  const logout = () => {
    dispatch(logoutUser());
    setShowLoginModal(false);
    setShowRegisterModal(false);
    history.push('/');
  };

  useEffect(() => {
    if (!showProfileMenu) return;
    const closeMenu = () => setShowProfileMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showProfileMenu]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} openMenu={openMenu} />;
  } else {
    sessionLinks = (
      <li className="tw-flex tw-justify-between">
        <ul className="tw-flex">
          <li className="tw-text-xl tw-p-1">
            <LoginFormModal />
          </li>
          <li className="tw-text-xl tw-p-1">
            <SignupFormModal />
          </li>
        </ul>
      </li>
    );
  }

  return (
    <>
      <nav className="tw-p-1 tw-flex tw-flex-col tw-bg-blue-dark">
        <ul className="tw-flex tw-justify-between">
          <div className="tw-flex tw-px-2">
            <li className="tw-rounded-md tw-flex tw-items-center tw-text-xl tw-p-1">
              <NavLink to="/" className="hover:tw-bg-blue tw-rounded-md tw-p-1" exact>Home</NavLink>
            </li>
            {sessionUser && (
              <>
                <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
                  <NavLink to="/drinks" className="hover:tw-bg-blue tw-rounded-md tw-p-1" exact>Drinks</NavLink>
                </li>
                <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
                  <DrinkFormModal showDrinkForm={showDrinkForm} setShowDrinkForm={setShowDrinkForm} />
                </li>
              </>
            )}
          </div>
          <div className="tw-flex tw-px-2">
            {sessionUser && <SearchBar />}
            {isLoaded && sessionLinks}
          </div>
        </ul>
      </nav>
      {showProfileMenu && (
        <div className="tw-absolute tw-right-0 tw-z-10 tw-flex tw-justify-end">
          <ul className="tw-p-4 tw-text-right tw-bg-green tw-rounded tw-border-2 tw-border-black">
            <li className="tw-p-1"><NavLink to={`/users/${sessionUser.id}`} className="hover:tw-underline">{sessionUser.username}</NavLink></li>
            <li className="tw-p-1">{sessionUser.email}</li>
            <li>
              <button onClick={logout} className="tw-p-1 tw-w-100 tw-px-2 tw-border tw-rounded tw-bg-red hover:tw-bg-red-dark">Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
};

export default Navigation;
