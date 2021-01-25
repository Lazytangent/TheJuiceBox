const ProfileButton = ({ user, openMenu }) => {
  return (
    <li className="tw-text-xl tw-p-1">
      <div className="tw-flex tw-justify-end">
        <button className="tw-border tw-p-1 tw-rounded tw-bg-blue-400 tw-px-3" onClick={openMenu}>
          <i className="fas fa-user"></i>
        </button>
      </div>
    </li>
  );
};

export default ProfileButton;
