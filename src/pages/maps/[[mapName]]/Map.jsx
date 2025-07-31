import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../../auth/AuthContext";
import useSetups from "../../../hooks/useSetups.js";
import useSetup from "../../../hooks/useSetup.js";
import CreateSetupForm from "../../../components/CreateSetupForm/CreateSetupForm.jsx";
import SetupList from "../../../components/Setup/SetupList";
import SidePicker from "../../../components/Setup/SidePicker";
import TypePicker from "../../../components/Setup/TypePicker";
import { toast } from "react-toastify";

const Map = ({ players }) => {
  const { user } = useAuth();
  const { mapName } = useParams();

  const [selectedSide, setSelectedSide] = useState("CT");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSetupId, setSelectedSetupId] = useState(null);

  const {
    setup: currentSetup,
    dispatch,
    selectedPlayer,
    updateTacMap,
    setSelectedPlayer,
    selectedRoundTime,
    setSelectedRoundTime,
    updateTitle,
    updateDescription,
    updatePlayerJob,
    initializeEmptySetup,
  } = useSetup(user?.gamertag ?? null);

  const { fetchedSetups, loading, fetchSetups, saveSetup, deleteSetup } =
    useSetups(mapName, selectedSide, selectedType);

  useEffect(() => {
    fetchSetups();
  }, [fetchSetups]);

  function handleSaveSetup() {
    if (selectedType === "all") {
      toast("Cannot create setup with type [all]!");
      return;
    }

    const setup = {
      ...currentSetup,
      side: selectedSide,
      type: selectedType,
      map: mapName,
      createdBy: user.gamertag,
    };

    saveSetup(setup, user, selectedSetupId, setSelectedSetupId);
  }

  function handleDeleteSetup() {
    if (!selectedSetupId) {
      toast("Can't delete non-existent setup");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this setup?",
    );
    if (!confirmDelete) return;

    deleteSetup(selectedSetupId);
    dispatch({ type: "CLEAR_SETUP" });
    setSelectedSetupId(null);
    fetchSetups();
  }

  function loadSetup(setup) {
    setSelectedSetupId(setup.id);
    setSelectedType(setup.type); // auto switch filter tab to type of clicked setup
    dispatch({ type: "LOAD_SETUP", payload: setup });
  }

  if (!user) {
    return (
      <div className="loading__user">
        <FontAwesomeIcon icon="spinner" className="user__spinner" />
      </div>
    );
  }

  return (
    <div>
      <Link to={`/maps/`}>
        <div className="back__container" style={{ color: "white" }}>
          <FontAwesomeIcon icon="arrow-left" size="xl" />
          <span className="back-text">Back</span>
        </div>
      </Link>

      <h1 className="map__title">{mapName}</h1>

      <div className="top-pickers__container">
        <SidePicker selectedSide={selectedSide} onChange={setSelectedSide} />
        <TypePicker selectedType={selectedType} onChange={setSelectedType} />
      </div>

      {currentSetup ? (
        <CreateSetupForm
          players={players}
          updateTacMap={(image) => updateTacMap(image, selectedSetupId)}
          setup={currentSetup}
          selectedRoundTime={selectedRoundTime}
          selectedPlayer={selectedPlayer}
          onTitleChange={(e) => updateTitle(e.target.value)}
          onRoundTimeChange={setSelectedRoundTime}
          onDescriptionChange={(e) => updateDescription(e.target.value)}
          onPlayerChange={setSelectedPlayer}
          onPlayerJobChange={(e) => updatePlayerJob(e.target.value)}
          onSave={handleSaveSetup}
          onDelete={handleDeleteSetup}
        />
      ) : (
        <SetupList
          loading={loading}
          fetchedSetups={fetchedSetups}
          initializeEmptySetup={initializeEmptySetup}
          loadSetup={loadSetup}
        />
      )}
    </div>
  );
};

export default Map;
