import React from "react";

const SidePicker = ({ selectedSide, onChange }) => {
  return (
    <div className="side-picker">
      <div
        className={`side-picker__tab ct-side-picker__tab ${selectedSide === "CT" ? "side-picker__tab--active" : ""}`}
        onClick={() => onChange("CT")}
      >
        CT
      </div>
      <div
        className={`side-picker__tab t-side-picker__tab ${selectedSide === "T" ? "side-picker__tab--active" : ""}`}
        onClick={() => onChange("T")}
      >
        T
      </div>
    </div>
  );
};

export default SidePicker;
