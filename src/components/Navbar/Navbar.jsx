import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { auth } from "../../firebase/init";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function openModal() {
    document.querySelector(".modal").classList.add("modal--active");
  }

  function Logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <>
      <nav className="navbar">
        {!user ? (
          <button className="navbar__btn" onClick={openModal}>
            Sign In
          </button>
        ) : (
          <button className="navbar__btn" onClick={Logout}>
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
