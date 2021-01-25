const NavButton = ({ onClick, name }) => {
  return (
    <button className="tw-border-2 tw-p-1 tw-rounded tw-bg-blue-400 hover:tw-bg-blue-500" onClick={onClick}>{ name }</button>
  );
};

export default NavButton;
