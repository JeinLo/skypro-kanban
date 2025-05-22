import React, { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";
import "../../App.css";

function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsUserPopupOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self">
              Logo
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self">
              Dark Logo
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <button
              type="button"
              className="header__user _hover02"
              onClick={handleUserClick}
            >
              Ivan Ivanov
            </button>
            <PopUser isOpen={isUserPopupOpen} onClose={handleClosePopup} />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
