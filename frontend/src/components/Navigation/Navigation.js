import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { logoutUser } from '../../store/session';

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const openMenu = () => {
    if (showProfileMenu) return;
    setShowProfileMenu(true);
  };

  const logout = () => dispatch(logoutUser());

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
      <nav className="tw-p-1 tw-flex tw-flex-col tw-bg-blue-300">
        <ul className="tw-flex tw-justify-between">
          <div className="tw-flex tw-px-2">
            <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
              <NavLink to="/" className="hover:tw-underline" exact>Home</NavLink>
            </li>
            <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
              <NavLink to="/drinks" className="hover:tw-underline" exact>Drinks</NavLink>
            </li>
          </div>
          <div className="tw-flex tw-px-2">
            {isLoaded && sessionLinks}
          </div>
        </ul>
      </nav>
      {showProfileMenu && (
        <div className="tw-flex tw-justify-end">
          <ul className="tw-p-4 tw-text-right tw-bg-blue-300 tw-rounded tw-border-2 tw-border-black">
            <li className="tw-p-1">{sessionUser.username}</li>
            <li className="tw-p-1">{sessionUser.email}</li>
            <li>
              <button onClick={logout} className="tw-p-1 tw-w-100 tw-px-2 tw-border tw-rounded tw-bg-green-400 hover:tw-bg-green-500">Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
};

export default Navigation;
