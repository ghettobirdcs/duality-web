import React, { useEffect, useRef, useState } from "react";
import "./CreateSetupForm.css";

import PlayerTabs from "../PlayerTabs/PlayerTabs.jsx";
import RoundTimeTabs from "../RoundTimeTabs/RoundTimeTabs.jsx";

export default function CreateSetupForm(props) {
  const {
    setup,
    updateTacMap,
    selectedRoundTime,
    selectedPlayer,
    onTitleChange,
    onRoundTimeChange,
    onDescriptionChange,
    onPlayerChange,
    onPlayerJobChange,
    onSave,
  } = props;

  const playerJobRef = useRef(null);

  useEffect(() => {
    if (playerJobRef.current) {
      playerJobRef.current.focus();
    }
  }, [selectedPlayer]);

  return (
    <div className="setup-form">
      <div className="setup-form__top">
        <input
          type="text"
          className="setup-title"
          placeholder="Setup title..."
          value={setup.title}
          onChange={onTitleChange}
        />
        <RoundTimeTabs
          selectedRoundTime={selectedRoundTime}
          onSelect={onRoundTimeChange}
        />
      </div>
      <div className="setup-form__bottom">
        <div className="setup-img">
          <img
            src={setup[selectedRoundTime]?.tacmap || "placeholder.svg"}
            alt={`${selectedRoundTime} round tactical map`}
          />
          <label htmlFor="tacmap-upload">
            Upload Tacmap ({selectedRoundTime}):
          </label>
          <input
            type="file"
            accept="image/*"
            id="tacmap-upload"
            onChange={(e) => updateTacMap(e.target.files[0])}
          />
        </div>
        <div className="setup-description-container">
          <textarea
            className="setup-description"
            placeholder={`Describe the ${selectedRoundTime} setup...`}
            value={setup[selectedRoundTime]?.description || ""}
            onChange={onDescriptionChange}
          />

          <PlayerTabs
            selectedPlayer={selectedPlayer}
            onSelect={onPlayerChange}
          />

          <textarea
            ref={playerJobRef}
            className="setup-description"
            placeholder={`Player ${selectedPlayer}'s job`}
            value={setup[selectedRoundTime]?.playerInfo?.[selectedPlayer] || ""}
            onChange={onPlayerJobChange}
          />

          <button className="navbar__btn save__btn" onClick={onSave}>
            Save Setup
          </button>
        </div>
      </div>
    </div>
  );
}
