import React from "react";
import "./PlayerTabs.css";

const PlayerTabs = ({ selectedPlayer, onSelect, players }) => {
  players = players.slice(0, 5);

  return (
    <div className="player-picker">
      {players.map((player, index) => (
        <div
          key={index}
          className={`player-tab${selectedPlayer === player.gamertag ? " player-tab--active" : ""}`}
          onClick={() => onSelect(player.gamertag)}
        >
          {player.gamertag}
        </div>
      ))}
    </div>
  );
};

export default PlayerTabs;
