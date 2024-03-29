import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "./SearchBar";
import MainLinks from "./MainLinks";
import SessionLinks from "./SessionLinks";
import ProfileMenu from "./ProfileMenu";

const Navigation = ({ isLoaded }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
            <MainLinks />
          </div>
          <div className="tw-flex tw-px-2">
            <div className="tw-py-2 tw-hidden md:tw-block">
              <SearchBar />
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
      <ProfileMenu showProfileMenu={showProfileMenu} />
    </>
  );
};

export default Navigation;
