import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SetupTile from "./SetupTile";

const SetupList = ({
  initializeEmptySetup,
  fetchedSetups,
  loading,
  loadSetup,
}) => {
  return (
    <ul className="setups__list">
      {/* CREATE SETUP BUTTON */}
      <li className="setup" onClick={initializeEmptySetup}>
        <FontAwesomeIcon icon="plus" size="lg" className="create-setup__icon" />
        <p>Create New Setup</p>
      </li>
      {loading ? (
        <li className="setup setup--loading">
          <FontAwesomeIcon icon="spinner" className="setup__spinner" />
        </li>
      ) : (
        <>
          {fetchedSetups.length !== 0 ? (
            fetchedSetups.map((setup, index) => (
              // SINGULAR SETUP
              <SetupTile
                loadSetup={loadSetup}
                setup={setup}
                index={index}
                key={setup.id}
              />
            ))
          ) : (
            <li className="setup">No setups found</li>
          )}
        </>
      )}
    </ul>
  );
};

export default SetupList;
