import React from "react";
import "./Navbar.css";

import AuthModal from "../AuthModal/AuthModal";

const Navbar = () => {
  function signIn() {
    document.querySelector(".modal").classList.add("modal--active");
  }

  function createUser() {
    document.querySelector(".modal").classList.add("modal--active");
  }

  return (
    <>
      <nav className="navbar">
        <button className="navbar__btn" onClick={signIn}>
          Sign In
        </button>
        <button className="navbar__btn" onClick={createUser}>
          Register
        </button>
      </nav>
      <AuthModal />
    </>
  );
};

export default Navbar;
