import React, { useState } from "react";
import "./Map.css";

import { useParams } from "react-router-dom";

const Map = () => {
  const { mapName } = useParams();
  const [side, setSide] = useState("CT");

  const switchSides = (newSide) => {
    setSide(newSide);
  };

  return (
    <div>
      <h1 className="map__title">{mapName}</h1>
      {/* T / CT Picker */}
      <div className="side-picker">
        <div
          className={`side-picker__tab ct-side-picker__tab ${side === "CT" ? "side-picker__tab--active" : ""}`}
          onClick={() => switchSides("CT")}
        >
          CT
        </div>
        <div
          className={`side-picker__tab t-side-picker__tab ${side === "T" ? "side-picker__tab--active" : ""}`}
          onClick={() => switchSides("T")}
        >
          T
        </div>
      </div>
      {/* Type of setup Picker (E.G. Default, Force buy, Execute, Eco, Anti-Eco) */}
      {/* query for setups: have the user click one */}
      {/* List of setups */}
      {/*------------------------*/}
      {/* Setup Name */}
      {/* Tacmap of setup */}{" "}
      {/* Click on a number/player --> show specifics for that player */}
      {/* Description of setup at selected time */}
      {/* Time adjust for specific setup (E.G. Early round, mid round, late round) */}
      {/* THIS CHANGES EVERY ELEMENT^^ */}
    </div>
  );
};

export default Map;
