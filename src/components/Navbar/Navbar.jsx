import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { auth } from "../../firebase/init";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function Logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <>
      <nav className="navbar">
        {!user ? (
          <button className="navbar__btn" onClick={console.log("sign in")}>
            Sign In
          </button>
        ) : (
          <>
            <Link to="/maps" className="navbar__btn">
              Maps
            </Link>
            <button className="navbar__btn" onClick={Logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
