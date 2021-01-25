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
    <nav className="tw-p-1 tw-flex tw-flex-col tw-bg-gray-300">
      <ul className="tw-flex tw-justify-between">
        <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
          <NavLink to="/" exact>Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  )
};

export default Navigation;
