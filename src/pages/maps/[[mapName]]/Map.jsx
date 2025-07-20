import React, { useEffect, useState } from "react";
import "./Map.css";

import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Map = () => {
  const { mapName } = useParams();
  const [side, setSide] = useState("CT");
  const [setupType, setSetupType] = useState("default");

  const setupOptions = [
    { label: "Default", value: "default" },
    { label: "Force", value: "force" },
    { label: "Execute", value: "execute" },
    { label: "Eco", value: "eco" },
    { label: "Anti-Eco", value: "anti-eco" },
  ];

  const switchSides = (newSide) => {
    setSide(newSide);
  };

  useEffect(() => {
    console.log("Re-render every time a setup type or setting is changed");
  }, []);

  return (
    <div>
      <Link to="/">
        <div className="back__container" style={{ color: "white" }}>
          <FontAwesomeIcon icon="arrow-left" size="xl" />
          <span className="back-text">Back</span>
        </div>
      </Link>
      <h1 className="map__title">{mapName}</h1>
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
      <div className="setup-type__dropdown">
        <label htmlFor="setup-select">Type of Setup:</label>
        <select
          id="setup-select"
          value={setupType}
          onChange={(event) => {
            setSetupType(event.target.value);
          }}
        >
          {setupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
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
