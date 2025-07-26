import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Maps from "./pages/maps/Maps";
import Map from "./pages/maps/[[mapName]]/Map";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComment,
  faXmark,
  faArrowLeft,
  faPlus,
  faCheck,
  faSpinner,
  faToggleOn,
  faToggleOff,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider } from "./auth/AuthContext";
import Hierarchy from "./pages/heirarchy/Hierarchy";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/init";
import { useEffect, useState } from "react";

library.add(
  faXmark,
  faComment,
  faArrowLeft,
  faPlus,
  faCheck,
  faSpinner,
  faToggleOn,
  faToggleOff,
  faExpand,
);

function App() {
  // WARN: URGENT
  // TODO: Clean up firebase storage for unused images

  // NOTE: Cosmetic
  // TODO: Responsiveness
  // TODO: Fix player tab switching to 'null' bug -> after it auto-selects the user as the player and the user changes to a time that has no player info
  // TODO: Don't allow empty setups to be created
  // TODO: Allow players to change their roles
  // TODO: Homework tab
  // TODO: Upload images without saving setup to db first
  // TODO: Move icons in setups list ( favorites? )
  // TODO: Strat counter for each map
  // TODO: Grey out save button when there is no unsaved changes
  // TODO: "Tell the little children what to put their eyes on" - Click

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(
        collection(db, "players"),
        where("peek_priority", "!=", null),
      );

      const { docs } = await getDocs(q);

      const players = docs
        .map((player) => ({ ...player.data(), id: player.id }))
        // NOTE: These are players that have peek_priority field, sorted
        .sort((a, b) => a.peek_priority - b.peek_priority);

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<Maps />} />
            <Route
              path="/hierarchy"
              element={<Hierarchy players={players} setPlayers={setPlayers} />}
            />
            <Route path="/maps/:mapName" element={<Map players={players} />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
