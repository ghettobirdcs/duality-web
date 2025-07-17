import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/init";
import "./Players.css";

const Players = () => {
  const [roster, setRoster] = useState([]);
  const [status, setStatus] = useState("");

  async function getRoster() {
    const playersRef = query(
      collection(db, "players"),
      where("A_Team", "==", true),
    );

    const { docs } = await getDocs(playersRef);
    setRoster(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  async function updateStatus() {
    const userDoc = roster.find((p) => p.uid === auth.currentUser.uid);
    const userRef = doc(db, "players", userDoc.id);

    await updateDoc(userRef, { status });
    toast(`New status: [${status}]`);
  }

  useEffect(() => {
    getRoster();
  }, [roster, status]);

  return (
    <div className="players__container">
      <h2>A Team:</h2>
      <ul className="players__list">
        {roster.map((player, index) => (
          <li className="player__item" key={index}>
            <span className="player__role">{player.role} -&nbsp;</span>
            {player.gamertag} <span className="player__role">&nbsp;</span>
            {auth.currentUser ? (
              player.uid === auth.currentUser.uid ? (
                <>
                  <FontAwesomeIcon
                    icon="comment"
                    className="player__status--icon"
                    size="xs"
                  />
                  <input
                    value={status}
                    className="player__status--input"
                    onChange={(event) => setStatus(event.target.value)}
                  />
                  <button
                    className="navbar__btn status__post"
                    onClick={updateStatus}
                  >
                    Post
                  </button>
                </>
              ) : (
                <span className="player__status">{player.status}</span>
              )
            ) : (
              <span className="player__status">{player.status}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
