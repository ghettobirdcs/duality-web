import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/init";

import "./Hierarchy.css";

const Hierarchy = ({ players, setPlayers }) => {
  const editPriority = async (playerId, direction) => {
    const player = players.find((p) => p.id === playerId);
    const currentPriority = player.peek_priority;

    const newPriority =
      direction === "up" ? currentPriority - 1 : currentPriority + 1;

    await updateDoc(doc(db, "players", playerId), {
      peek_priority: newPriority,
    });

    setPlayers((prev) =>
      prev
        .map((p) =>
          p.id === playerId ? { ...p, peek_priority: newPriority } : p,
        )
        .sort((a, b) => a.peek_priority - b.peek_priority),
    );
  };

  const handleClick = (e, playerId) => {
    e.preventDefault();
    if (e.type === "click") {
      editPriority(playerId, "up");
    } else if (e.type === "contextmenu") {
      editPriority(playerId, "down");
    }
  };

  return (
    <div className="hierarchy__container">
      <Link to="/" className="back__container" style={{ color: "white" }}>
        <FontAwesomeIcon icon="arrow-left" size="xl" />
        <span className="back-text">Back</span>
      </Link>
      <h1 className="hierarchy__title">Order of peeking operations</h1>
      {players.map((player, index) => (
        <div
          className="player"
          key={index}
          onClick={(e) => handleClick(e, player.id)}
          onContextMenu={(e) => handleClick(e, player.id)}
        >
          <span className="hierarchy__num">{player.peek_priority}</span> -{" "}
          {player.gamertag}
        </div>
      ))}
    </div>
  );
};

export default Hierarchy;
