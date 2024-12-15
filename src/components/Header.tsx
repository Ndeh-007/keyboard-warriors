import React, { ReactNode } from "react";
import LOCAL_IMAGES from "../core/images";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../core/routes";

const Header: React.FC<{ subheader?: ReactNode }> = ({ subheader }) => {
  let navigate = useNavigate();

  // #region workers
  function showProfile() {
    navigate(APP_ROUTES["profile"].url);
  }

  function showAuth() {
    navigate(APP_ROUTES["auth"].url);
  }

  function showHome() {
    navigate(APP_ROUTES["home"].url);
  }

  // #endregion

  // #region event handlers

  function handleProfileClicked() {
    showProfile();
  }
  function handleLogoutClicked() {
    showAuth();
  }
  // #endregion

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="container mx-auto p-5 flex space-between">
        {/* the logo region */}
        <div
          className="flex-none items-center cursor-pointer"
          onClick={() => showHome()}
        >
          <img
            src={LOCAL_IMAGES.navBarLogo}
            alt=""
            style={{ width: "10rem" }}
          />
        </div>

        {/* the ads sections */}
        <div className="header-ads-holder grow"></div>

        {/* the right section */}
        <div className="flex-none">
          <div className="header-button-holder">
            <button
              className="header-button"
              onClick={() => handleProfileClicked()}
            >
              <span className="material-icons">account_circle</span>
            </button>
            <button
              className="header-button"
              onClick={() => handleLogoutClicked()}
            >
              <span className="material-icons">logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto sub-header">
        {subheader ? subheader : ""}
      </div>
    </div>
  );
};

export default Header;
