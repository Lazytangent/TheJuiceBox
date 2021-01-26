import NavButton from '../Parts/Buttons/NavButton';

const ProfileButton = ({ user, openMenu }) => {
  return (
    <li className="tw-text-xl tw-p-1">
      <div className="tw-flex tw-justify-end">
        <NavButton name={<i className="fas fa-user"></i>} onClick={openMenu} />
      </div>
    </li>
  );
};

export default ProfileButton;
