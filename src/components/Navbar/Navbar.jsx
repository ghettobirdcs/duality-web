import React, { useState } from "react";
import "./Navbar.css";

import AuthModal from "../AuthModal/AuthModal";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function signIn() {
    setModalOpen(true);
  }

  function createUser() {
    setModalOpen(true);
  }

  return (
    <>
      {modalOpen ? (
        <AuthModal setModalOpen={setModalOpen} />
      ) : (
        <nav className="navbar">
          <button className="navbar__btn" onClick={signIn}>
            Sign In
          </button>
          <button className="navbar__btn" onClick={createUser}>
            Register
          </button>
        </nav>
      )}
    </>
  );
};

export default Navbar;
