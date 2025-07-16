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
            <li>
              <p>Email:</p>
              <input type="email" placeholder="john@example.com" />
            </li>
            <li>
              <p>Password:</p>
              <input type="password" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
