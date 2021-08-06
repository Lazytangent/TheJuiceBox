import { useSelector } from "react-redux";

import { session } from "../../store/selectors";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const SessionLinks = ({ showProfileMenu, setShowProfileMenu }) => {
  const sessionUser = useSelector(session.user());

  const openMenu = () => {
    if (showProfileMenu) return;
    setShowProfileMenu(true);
  };

  if (sessionUser) {
    return <ProfileButton user={sessionUser} openMenu={openMenu} />;
  }

  return (
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
};

export default SessionLinks;
