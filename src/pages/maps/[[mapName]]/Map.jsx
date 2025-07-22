import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Map.css";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/init";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CreateSetupForm from "../../../components/CreateSetupForm/CreateSetupForm.jsx";
import useSetup from "../../../hooks/useSetup";
import { useAuth } from "../../../auth/AuthContext";

const Map = () => {
  const navigate = useNavigate();
  const { mapName } = useParams();

  const [selectedSide, setSelectedSide] = useState("CT");
  const [selectedType, setSelectedType] = useState("all-t");
  const [fetchedSetups, setFetchedSetups] = useState([]);
  const [selectedSetupId, setSelectedSetupId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

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
  } = useSetup();

  const setupOptions = [
    { label: "All Types (T)", value: "all-t" },
    { label: "All Types (CT)", value: "all-ct" },
    { label: "Default", value: "default" },
    { label: "Force", value: "force" },
    { label: "Execute", value: "execute" },
    { label: "Eco", value: "eco" },
    { label: "Anti-Eco", value: "anti-eco" },
  ];

  useEffect(() => {
    async function fetchSetups() {
      setLoading(true);
      try {
        let results = [];

        if (selectedType === "all-ct") {
          // Get all CT side setups for this map
          const setupsRef = collection(db, "setups");
          const q = query(
            setupsRef,
            where("map", "==", mapName),
            where("side", "==", "CT"),
          );

          const { docs } = await getDocs(q);
          results = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else if (selectedType === "all-t") {
          // Get all T side setups for this map
          const setupsRef = collection(db, "setups");
          const q = query(
            setupsRef,
            where("map", "==", mapName),
            where("side", "==", "T"),
          );

          const { docs } = await getDocs(q);
          results = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else {
          // Get filtered setups based on selected side and type
          const setupsRef = collection(db, "setups");
          const q = query(
            setupsRef,
            where("side", "==", selectedSide),
            where("type", "==", selectedType),
            where("map", "==", mapName),
          );

          const { docs } = await getDocs(q);
          results = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setFetchedSetups(results);
      } catch (error) {
        toast("Error fetching setups");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSetups();
  }, [selectedSide, selectedType, mapName]);

  async function saveSetup() {
    if (selectedType === "all-ct" || selectedType === "all-t") {
      toast("Cannot create setup with type [all]!");
      return;
    }

    if (user) {
      const setup = {
        ...currentSetup,
        side: selectedSide,
        type: selectedType,
        map: mapName,
        createdBy: user.gamertag,
      };

      try {
        if (selectedSetupId) {
          const docRef = doc(db, "setups", selectedSetupId);
          await setDoc(docRef, setup);
        } else {
          await addDoc(collection(db, "setups"), setup);
        }

        toast("Setup saved successfully");
        // TODO: properly clear setup
        navigate(`/maps/${mapName}`);
      } catch (error) {
        console.error("Failed to save setup:", error);
        toast("Error saving setup");
      }
    }
  }

  async function deleteSetup() {
    if (selectedSetupId) {
      const setupRef = doc(db, "setups", selectedSetupId);

      deleteDoc(setupRef);
      toast("Setup deleted successfully");

      // Clear current setup and go back to the list
      setSelectedSetupId(null);
      // TODO: properly clear setup
      dispatch({ type: "CLEAR_SETUP" });
      navigate(`/maps/${mapName}`);
    } else {
      toast("Can't delete non-existant setup");
    }
  }

  function loadSetup(setup) {
    setSelectedSetupId(setup.id);
    dispatch({ type: "LOAD_SETUP", payload: setup });
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
      <div className="side-picker">
        <div
          className={`side-picker__tab ct-side-picker__tab ${selectedSide === "CT" ? "side-picker__tab--active" : ""}`}
          onClick={() => setSelectedSide("CT")}
        >
          CT
        </div>
        <div
          className={`side-picker__tab t-side-picker__tab ${selectedSide === "T" ? "side-picker__tab--active" : ""}`}
          onClick={() => setSelectedSide("T")}
        >
          T
        </div>
      </div>
      <div className="setup-type__dropdown">
        <label htmlFor="setup-select">Type:</label>
        <select
          id="setup-select"
          value={selectedType}
          onChange={(event) => {
            setSelectedType(event.target.value);
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
        <CreateSetupForm
          updateTacMap={(image) => updateTacMap(image, selectedSetupId)}
          setup={currentSetup}
          selectedRoundTime={selectedRoundTime}
          selectedPlayer={selectedPlayer}
          onTitleChange={(e) => updateTitle(e.target.value)}
          onRoundTimeChange={setSelectedRoundTime}
          onDescriptionChange={(e) => updateDescription(e.target.value)}
          onPlayerChange={setSelectedPlayer}
          onPlayerJobChange={(e) => updatePlayerJob(e.target.value)}
          onSave={saveSetup}
          onDelete={deleteSetup}
        />
      ) : (
        // TODO: More info on setup square - like which side and type and whatnot
        <ul className="setups__list">
          <li className="setup" onClick={initializeEmptySetup}>
            <FontAwesomeIcon
              icon="plus"
              size="lg"
              className="create-setup__icon"
            />
            <p>Create New Setup</p>
          </li>
          {loading ? (
            // TODO: Spinner
            <li className="setup setup--loading">Loading...</li>
          ) : (
            <>
              {fetchedSetups.length !== 0 ? (
                fetchedSetups.map((setup) => (
                  <li
                    key={setup.id}
                    className="setup"
                    onClick={() => loadSetup(setup)}
                  >
                    <div className="setup__info">
                      <p className="setup__info--title">
                        {setup.title || "Untitled Setup"}
                      </p>
                      <p className="setup__info--author">
                        Author: {setup.createdBy}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="setup">No setups found</li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Map;
