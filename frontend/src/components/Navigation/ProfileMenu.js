import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { session } from '../../store/selectors';
import { logoutUser } from '../../store/session';
import { useUserAuth } from '../../context/AuthContext';

const ProfileMenu = ({ showProfileMenu }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(session.user());
  const { setShowLoginModal, setShowRegisterModal } = useUserAuth();

  const logout = () => {
    dispatch(logoutUser());
    setShowLoginModal(false);
    setShowRegisterModal(false);
    history.push("/");
  };

  if (!sessionUser) return null;

  return (
    <div
      className={`tw-absolute tw-right-0 tw-z-10 tw-flex tw-justify-end ${showProfileMenu
          ? "tw-transition tw-ease-out tw-duration-100 tw-transform tw-opacity-100 tw-scale-100"
          : "tw-transition tw-ease-in tw-duration-100 tw-transform tw-opacity-0 tw-scale-95"
        }`}
    >
      <ul className="tw-p-4 tw-text-right tw-bg-green tw-rounded tw-border-2 tw-border-black">
        <li className="tw-p-1">
          <NavLink
            to={`/users/${sessionUser.id}`}
            className="hover:tw-underline"
          >
            {sessionUser.username}
          </NavLink>
        </li>
        <li className="tw-p-1">{sessionUser.email}</li>
        <li>
          <button
            onClick={logout}
            className="tw-p-1 tw-w-100 tw-px-2 tw-border tw-rounded tw-bg-red hover:tw-bg-red-dark"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
