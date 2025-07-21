import React from "react";
import "./PlayerTabs.css";

const PlayerTabs = ({ selectedPlayer, onSelect }) => {
  return (
    <div className="player-picker">
      {[1, 2, 3, 4, 5].map((num) => (
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
