import React from "react";
import "../../../App.css";

function PopUser({ isOpen, onClose }) {
  return (
    <div
      className="header__pop-user-set pop-user-set"
      id="user-set-target"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <p className="pop-user-set__name">Ivan Ivanov</p>
      <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox" />
      </div>
      <button type="button" className="_hover03" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

export default PopUser;
