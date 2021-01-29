const NavButton = ({ onClick, name }) => {
  return (
    <button className="tw-border-2 tw-p-1 tw-rounded tw-border-black tw-bg-purple hover:tw-bg-purple-dark" onClick={onClick}>{ name }</button>
  );
};

export default NavButton;
