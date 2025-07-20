import React, { useEffect, useState } from "react";
import "./Map.css";

import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Map = () => {
  const { mapName } = useParams();
  const [side, setSide] = useState("CT");
  const [setupType, setSetupType] = useState("default");
  const [currentSetup, setCurrentSetup] = useState(null);
  const [title, setTitle] = useState("");

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
    // TODO: This
    console.log("Re-render every time a setup type or setting is changed");
  }, []);

  function createSetup() {
    const setup = {
      title: "EXAMPLE: Mid take",
      description: "Describe what the goal of this setup is...",
      tacmap: "url to pic database",
      roundTime: "mid-round",
      playerInfo: {
        1: "First guy directions",
        2: "Second guy directions",
        3: "Third guy directions",
        4: "Fourth guy directions",
        5: "Fifth guy directions",
      },
    };
    setCurrentSetup(setup);
    console.log(setup);
  }

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
      {/* Create new Setup button */} {/* List of setups */}
      {currentSetup ? (
        <div className="setup__form">
          <p>Title:</p>
          <input
            type="text"
            className="setup__title"
            placeholder="Name your strategy..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      ) : (
        <ul className="setups__list">
          <li className="setup" onClick={createSetup}>
            <FontAwesomeIcon
              icon="plus"
              size="lg"
              className="create-setup__icon"
            />
            <p>Create New Setup</p>
          </li>
        </ul>
      )}
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
