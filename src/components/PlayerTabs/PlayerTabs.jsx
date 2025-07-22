import React from "react";
import "./PlayerTabs.css";

const PlayerTabs = ({ selectedPlayer, onSelect }) => {
  return (
    <div className="player-picker">
      {["ghettobird", "IJustClick", "Zim", "Upstart", "Jello"].map((player) => (
        <div
          key={player}
          className={`player-tab${selectedPlayer === player ? " player-tab--active" : ""}`}
          onClick={() => onSelect(player)}
        >
          {player}
        </div>
      ))}
    </div>
  );
};

export default PlayerTabs;
