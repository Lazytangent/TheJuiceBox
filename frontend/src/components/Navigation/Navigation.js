import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { session } from "../../store/selectors";
import { logoutUser } from "../../store/session";
import { useUserAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import DrinkFormModal from "../DrinkForm";
import SessionLinks from "./SessionLinks";

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(session.user());
  const { setShowLoginModal, setShowRegisterModal } = useUserAuth();

  const [showDrinkForm, setShowDrinkForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    setShowLoginModal(false);
    setShowRegisterModal(false);
    history.push("/");
  };

  useEffect(() => {
    if (!showProfileMenu) return;
    const closeMenu = () => setShowProfileMenu(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showProfileMenu]);

  return (
    <>
      <nav className="tw-p-1 tw-flex tw-flex-col tw-bg-blue-dark">
        <ul className="tw-flex tw-justify-between">
          <div className="tw-flex tw-px-2">
            <li className="tw-rounded-md tw-flex tw-items-center tw-text-xl tw-p-1">
              <NavLink
                to="/"
                className="hover:tw-bg-blue tw-rounded-md tw-p-1"
                exact
              >
                Home
              </NavLink>
            </li>
            {sessionUser && (
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
                  <DrinkFormModal
                    showDrinkForm={showDrinkForm}
                    setShowDrinkForm={setShowDrinkForm}
                  />
                </li>
              </>
            )}
          </div>
          <div className="tw-flex tw-px-2">
            <div className="tw-py-2 tw-hidden md:tw-block">
              {sessionUser && <SearchBar />}
            </div>
            <div className="tw-py-1">
              {isLoaded && (
                <SessionLinks
                  showProfileMenu={showProfileMenu}
                  setShowProfileMenu={setShowProfileMenu}
                />
              )}
            </div>
          </div>
        </ul>
      </nav>
      {sessionUser && (
        <div
          className={`tw-absolute tw-right-0 tw-z-10 tw-flex tw-justify-end ${
            showProfileMenu
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
      )}
    </>
  );
};

export default Navigation;
