import React, { useEffect, useRef } from "react";
import "./CreateSetupForm.css";

import PlayerTabs from "../PlayerTabs/PlayerTabs.jsx";
import RoundTimeTabs from "../RoundTimeTabs/RoundTimeTabs.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

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
    onDelete,
    players,
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
          <div className="upload-wrapper">
            <label htmlFor="tacmap-upload" className="upload-label">
              Upload Tacmap ({selectedRoundTime}):{" "}
            </label>
            <label htmlFor="tacmap-upload" className="upload-button">
              Choose File
            </label>
            <input
              type="file"
              accept="image/*"
              id="tacmap-upload"
              className="file-input"
              onChange={(e) => updateTacMap(e.target.files[0])}
            />
          </div>
          <div
            className="fullscreen__button"
            onClick={() => toast("Coming soon!")}
          >
            <FontAwesomeIcon icon="expand" size="9x" />
          </div>
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
            players={players}
          />

          <textarea
            ref={playerJobRef}
            className="setup-description"
            placeholder={`${selectedPlayer}'s job...`}
            value={setup[selectedRoundTime]?.playerInfo?.[selectedPlayer] || ""}
            onChange={onPlayerJobChange}
          />

          <div className="bottom__btns">
            <button
              className="navbar__btn save__btn delete__btn"
              onClick={onDelete}
            >
              Delete Setup
            </button>
            <button className="navbar__btn save__btn" onClick={onSave}>
              Save Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
