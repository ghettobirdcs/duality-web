import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./AuthModal.css";

const AuthModal = () => {
  return (
    <div className="modal">
      <div className="container">
        <FontAwesomeIcon
          icon="xmark"
          className="icon"
          onClick={() =>
            document.querySelector(".modal").classList.remove("modal--active")
          }
        />
        <div className="row">
          <ul>
            <li>Email:</li>
            <li>Password:</li>
          </ul>
        </div>
        <div className="row">
          <ul>
            <li>
              <input type="email" placeholder="john@example.com" />
            </li>
            <li>
              <input type="password" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
