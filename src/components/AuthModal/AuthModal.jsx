import React, { useState } from "react";
import "./AuthModal.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/init";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";

const AuthModal = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamertag, setGamertag] = useState("");
  const [role, setRole] = useState("");
  const [onTeam, setOnTeam] = useState(false);

  const modal_elem = document.querySelector(".modal");

  function SubmitForm() {
    modal_elem.classList.remove("modal--active");

    if (signState === "Sign Up") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          AddPlayer(user);
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    }
  }

  function AddPlayer(user) {
    const player = {
      uid: user.uid,
      gamertag: gamertag,
      role: role,
      A_Team: onTeam,
    };

    addDoc(collection(db, "players"), player);
  }

  return (
    <div className="modal">
      <div className="container">
        <FontAwesomeIcon
          icon="xmark"
          className="icon"
          onClick={() => modal_elem.classList.remove("modal--active")}
        />
        <div className="modal__form">
          {signState === "Sign In" ? (
            <div className="login">
              <p className="login__p">Email:</p>
              <input
                type="email"
                value={email}
                placeholder="john@example.com"
                onChange={(event) => setEmail(event.target.value)}
                className="login__input"
              />

              <p className="login__p">Password:</p>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login__input"
              />

              <p className="modal__switch--text">
                Don't have an account?
                <span
                  className="modal__switch--btn"
                  onClick={() => setSignState("Sign Up")}
                >
                  Become a member
                </span>
              </p>
            </div>
          ) : (
            <div className="register">
              <p className="register__p">Gamertag:</p>
              <input
                type="text"
                className="register__input"
                value={gamertag}
                onChange={(event) => setGamertag(event.target.value)}
              />

              <p className="register__p">In-Game Role:</p>
              <input
                type="text"
                className="register__input"
                placeholder="IGL, Support, Lurker, etc..."
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />

              <p className="register__p">
                Have you been assigned the 'A Team' role?
              </p>
              <input
                type="checkbox"
                className="register__input--checkbox"
                value={onTeam}
                onChange={(event) => setOnTeam(event.target.checked)}
              />

              <p className="register__p">Email:</p>
              <input
                type="email"
                value={email}
                placeholder="john@example.com"
                onChange={(event) => setEmail(event.target.value)}
                className="register__input"
              />

              <p className="register__p">Password:</p>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="register__input"
              />

              <p className="modal__switch--text">
                Already have an account?
                <span
                  className="modal__switch--btn"
                  onClick={() => setSignState("Sign In")}
                >
                  Log In
                </span>
              </p>
            </div>
          )}
          <div className="submit__container">
            <button className="navbar__btn sign__btn" onClick={SubmitForm}>
              {signState}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
