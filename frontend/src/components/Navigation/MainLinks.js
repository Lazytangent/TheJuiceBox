import { NavLink } from 'react-router-dom';
import DrinkFormModal from '../DrinkForm';

const MainLinks = () => {
  return (
    <>
      <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
        <NavLink
          to="/drinks"
          className="hover:tw-bg-blue tw-rounded-md tw-p-1"
          exact
        >
          Drinks
        </NavLink>
      </li>
      <li className="tw-flex tw-items-center tw-text-xl tw-p-1">
        <DrinkFormModal />
      </li>
    </>
  );
};

export default MainLinks;
