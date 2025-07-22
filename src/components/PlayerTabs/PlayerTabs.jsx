import React from "react";
import "./PlayerTabs.css";

const PlayerTabs = ({ selectedPlayer, onSelect }) => {
  return (
    <div className="player-picker">
      {["ghettobird", "IJustClick", "Zim", "Upstart", "Jello"].map((num) => (
        <div
          key={num}
          className={`player-tab${selectedPlayer === num ? " player-tab--active" : ""}`}
          onClick={() => onSelect(num)}
        >
          P{num}
        </div>
      ))}
    </div>
  );
};

export default PlayerTabs;
