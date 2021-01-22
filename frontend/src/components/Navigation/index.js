import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <li className="navbar__nav-links">
        <ul className="auth-btns">
          <li className="navbar__nav-links--navlink">
            <LoginFormModal />
          </li>
          <li className="navbar__nav-links--navlink">
            <SignupFormModal />
          </li>
        </ul>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <ul className="navbar__nav-links">
        <li className="navbar__nav-links--navlink">
          <NavLink to="/" exact>Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  )
};

export default Navigation;
