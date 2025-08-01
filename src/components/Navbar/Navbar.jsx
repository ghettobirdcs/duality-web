import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { auth } from "../../firebase/init";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ onSignIn }) => {
  const [user, setUser] = useState(null);
  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);

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
    setLogoutMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            className="duality__icon"
            src="/duality_logo_final.png"
            alt="team logo"
          />
          <h1 className="team__name">Duality Web App</h1>
        </div>
        <div className="navbar-right">
          {!user ? (
            <button className="navbar__btn" onClick={onSignIn}>
              Sign In
            </button>
          ) : (
            <>
              <Link to="/maps" className="navbar__btn">
                Maps
              </Link>
              <button
                className="profile__btn"
                onClick={() => setLogoutMenuOpen(!logoutMenuOpen)}
              >
                <FontAwesomeIcon icon="user" />
              </button>
              <div
                className={`logout-menu ${logoutMenuOpen ? "visible" : "hidden"}`}
              >
                <p className="logout__text">Log out of Duality?</p>
                <div className="logout__btns">
                  <button
                    className="logout__btn logout__btn--confirm"
                    onClick={Logout}
                  >
                    Yes
                  </button>
                  <button
                    className="logout__btn logout__btn--deny"
                    onClick={() => setLogoutMenuOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
