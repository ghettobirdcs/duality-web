import React from "react";
import "./RoundTimeTabs.css";

const RoundTimeTabs = ({ selectedRoundTime, onSelect }) => {
  return (
    <div className="round-time-picker">
      {["early", "mid", "late"].map((time) => (
        <div
          key={time}
          className={`round-time__tab ${
            selectedRoundTime === time ? "round-time__tab--active" : ""
          }`}
          onClick={() => onSelect(time)}
        >
          {time.charAt(0).toUpperCase() + time.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default RoundTimeTabs;
