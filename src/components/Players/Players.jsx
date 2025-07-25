import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase/init";
import "./Players.css";

const Players = () => {
  const [roster, setRoster] = useState([]);
  const [status, setStatus] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(true);

  const statusRef = useRef();

  async function getRoster() {
    const playersRef = query(
      collection(db, "players"),
      where("A_Team", "==", true),
    );

    const { docs } = await getDocs(playersRef);
    setRoster(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  async function updateStatus() {
    const userRef = doc(db, "players", auth.currentUser.uid);
    await updateDoc(userRef, { status });
    await getRoster();
  }

  async function updateRole(playerId) {
    const userRef = doc(db, "players", playerId);
    await updateDoc(userRef, { role: newRole });
    await getRoster();
    setEditingRoleId(null);
  }

  function changeRole(playerId, currentRole) {
    setEditingRoleId(playerId);
    setNewRole(currentRole || "");
  }

  useEffect(() => {
    getRoster();
  }, [roster]);

  useEffect(() => {
    if (statusOpen && statusRef.current) {
      statusRef.current.focus();
    }
  }, [statusOpen]);

  return (
    <div className="players__container">
      <h2>A Team:</h2>
      <ul className="players__list">
        {loading ? (
          <li className="player__item player__item--skeleton">
            <FontAwesomeIcon icon="spinner" className="player__spinner" />
          </li>
        ) : (
          roster.map((player) => (
            <li className="player__item" key={player.id}>
              <div className="player__container">
                {auth.currentUser &&
                auth.currentUser.uid === player.id &&
                editingRoleId === player.id ? (
                  <input
                    className="player__role--input"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onBlur={() => updateRole(player.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateRole(player.id);
                      if (e.key === "Escape") setEditingRoleId(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className="player__role"
                    onClick={() => changeRole(player.id, player.role)}
                  >
                    {player.role}&nbsp;-&nbsp;
                  </span>
                )}
                <p className="player__gamertag">
                  {player.gamertag} <span className="player__role">&nbsp;</span>
                </p>
              </div>
              {auth.currentUser && auth.currentUser.uid === player.id ? (
                // CURRENT USER STATUS
                <>
                  <FontAwesomeIcon
                    icon="comment"
                    className="player__status--icon"
                    size="xs"
                    onClick={() => setStatusOpen(!statusOpen)}
                  />
                  {statusOpen ? (
                    // CHANGE STATUS
                    <div className="player__status--container">
                      <input
                        ref={statusRef}
                        value={status}
                        className="player__status--input"
                        onChange={(event) => setStatus(event.target.value)}
                        placeholder={player.status}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            setStatusOpen(false);
                            updateStatus();
                          } else if (event.key === "Escape") {
                            setStatusOpen(false);
                          }
                        }}
                      />
                      <button
                        className="navbar__btn status__post"
                        onClick={() => {
                          setStatusOpen(false);
                          updateStatus();
                        }}
                      >
                        Post
                      </button>
                    </div>
                  ) : // DISPLAY STATUS (current user)
                  player.status ? (
                    <span className="player__status">{player.status}</span>
                  ) : (
                    <span className="player__status">
                      <FontAwesomeIcon
                        style={{ paddingRight: "8px" }}
                        icon="arrow-left"
                      />
                      Say something to your teammates
                    </span>
                  )}
                </>
              ) : // PLAYER STATUS
              player.status ? (
                <span className="player__status">{player.status}</span>
              ) : (
                <span className="player__status player__status--empty">
                  Empty...
                </span>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Players;
