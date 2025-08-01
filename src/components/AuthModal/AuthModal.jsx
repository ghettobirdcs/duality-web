import React, { useState } from "react";
import "./AuthModal.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/init";
import { doc, setDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const AuthModal = ({ modalOpen, onClose }) => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamertag, setGamertag] = useState("");
  const [role, setRole] = useState("");
  const [requestATeam, setRequestATeam] = useState(false);

  function SubmitForm() {
    onClose(); // close modal

    if (signState === "Sign Up") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          AddPlayer(user);
          toast("Added player to database");
        })
        .catch((error) => {
          toast(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        toast(error.message);
      });
    }
  }

  function AddPlayer(user) {
    const player = {
      email: user.email,
      gamertag: gamertag,
      role: role,
      pending: requestATeam,
      A_Team: false,
      peek_priority: 6, // Determines order of players,
      // Start new players just under the starting 5 roster
    };

    const playerRef = doc(db, "players", user.uid);
    setDoc(playerRef, player);
  }

  return (
    <div className={`modal ${modalOpen ? "modal--active" : ""}`}>
      <div className="container">
        <FontAwesomeIcon icon="xmark" className="icon" onClick={onClose} />
        <div className="modal__form">
          {signState === "Sign In" ? (
            <div
              className="login"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  SubmitForm();
                }
              }}
            >
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
            <div
              className="register"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  SubmitForm();
                }
              }}
            >
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
                Request access? (A Team members click this)
              </p>
              <input
                type="checkbox"
                className="register__input--checkbox"
                value={requestATeam}
                onChange={(event) => setRequestATeam(event.target.checked)}
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
