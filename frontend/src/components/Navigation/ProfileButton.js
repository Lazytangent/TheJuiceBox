import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = () => dispatch(logoutUser());

  return (
    <li className="navbar__nav-links--navlink">
      <div className="profile-btn-div">
        <button className="profile-btn" onClick={openMenu}>
          <i className="fas fa-user"></i>
        </button>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default ProfileButton;
