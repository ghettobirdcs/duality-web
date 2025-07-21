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
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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
    console.log("Re-render setup");
  }, [currentSetup]);

  // NOTE: Example empty setup:
  function createSetup() {
    const setup = {
      title: "EXAMPLE: Mid take",
      description: "Describe what the goal of this setup is...",
      tacmap: "url to pic database",
      roundTime: "early",
      playerInfo: {
        1: "First guy directions",
        2: "Second guy directions",
        3: "Third guy directions",
        4: "Fourth guy directions",
        5: "Fifth guy directions",
      },
    };
    setCurrentSetup(setup);
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
        <label htmlFor="setup-select">Type:</label>
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
      {currentSetup ? (
        <div className="setup-form">
          <div className="setup-form__top">
            <input
              type="text"
              className="setup-title"
              placeholder="Setup title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="round-time-picker">
              {["early", "mid", "late"].map((time) => (
                <div
                  key={time}
                  className={`round-time__tab ${
                    currentSetup.roundTime === time
                      ? "round-time__tab--active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentSetup({ ...currentSetup, roundTime: time })
                  }
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </div>
              ))}
            </div>
          </div>
          <div className="setup-form__bottom">
            <div className="setup-img">
              <img src="/placeholder.svg" alt="Tac Map" />
            </div>
            <div className="setup-description-container">
              <textarea
                className="setup-description"
                placeholder={`Describe the ${currentSetup.roundTime} setup...`}
              />

              <div className="player-picker">
                {/* NOTE: Placeholder values */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`player-tab${selectedPlayer === num ? " player-tab--active" : ""}`}
                    onClick={() => setSelectedPlayer(num)}
                  >
                    P{num}
                  </div>
                ))}
              </div>

              <textarea
                className="setup-description"
                placeholder={`Player ${selectedPlayer}'s job`}
              />

              <button className="navbar__btn save__btn">Save Setup</button>
            </div>
          </div>
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
