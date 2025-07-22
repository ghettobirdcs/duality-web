import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./PlayerTabs.css";

const PlayerTabs = ({ selectedPlayer, onSelect, players }) => {
  players = players.slice(0, 5);
  const numbers = ["1", "2", "3", "4", "5"];

  const [showingPlayers, setShowingPlayers] = useState(true);

  function togglePlayers() {
    if (showingPlayers) {
      setShowingPlayers(false);
    } else {
      setShowingPlayers(true);
    }
  }

  return (
    <div className="player-picker">
      <div
        className="player-picker__toggle"
        onClick={() => togglePlayers(showingPlayers)}
      >
        {showingPlayers ? (
          <FontAwesomeIcon icon="toggle-on" />
        ) : (
          <FontAwesomeIcon icon="toggle-off" />
        )}
      </div>
      {players.map((player, index) => (
        <div
          key={index}
          className={`player-tab${selectedPlayer === player.gamertag ? " player-tab--active" : ""}`}
          onClick={() => onSelect(player.gamertag)}
        >
          {showingPlayers ? player.gamertag : numbers[index]}
        </div>
      ))}
    </div>
  );
};

export default PlayerTabs;
