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
import { db } from "../../firebase/init";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingPlayers, setPendingPlayers] = useState([]);

  useEffect(() => {
    async function fetchPending() {
      const playersRef = query(
        collection(db, "players"),
        where("pending", "==", true),
      );
      const { docs } = await getDocs(playersRef);

      setPendingPlayers(
        docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    }

    fetchPending();
  }, []);

  async function approvePlayer(id) {
    const playerRef = doc(db, "players", id);

    await updateDoc(playerRef, {
      A_Team: true,
      pending: false,
    });

    setPendingPlayers((prev) => prev.filter((player) => player.id !== id));
  }

  async function denyPlayer(id) {
    const playerRef = doc(db, "players", id);

    await updateDoc(playerRef, {
      pending: false,
    });

    setPendingPlayers((prev) => prev.filter((player) => player.id !== id));
  }

  return (
    <div className="pending-players__container">
      <p>Players pending approval:</p>
      {pendingPlayers.map((player) => (
        <li className="pending-player" key={player.id}>
          {player.gamertag} - {player.email}
          <div className="pending__btns">
            <div
              className="pending__btn"
              onClick={() => approvePlayer(player.id)}
            >
              <FontAwesomeIcon icon="check" />
            </div>
            <div
              className="pending__btn pending__btn--deny"
              onClick={() => denyPlayer(player.id)}
            >
              <FontAwesomeIcon icon="xmark" />
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default AdminDashboard;
