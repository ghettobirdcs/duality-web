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
  faXmark,
  faArrowLeft,
  faPlus,
  faCheck,
  faSpinner,
  faToggleOn,
  faToggleOff,
  faExpand,
  faUser,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider } from "./auth/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/init";
import { useCallback, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

library.add(
  faArrowUp,
  faXmark,
  faArrowLeft,
  faPlus,
  faCheck,
  faSpinner,
  faToggleOn,
  faToggleOff,
  faExpand,
  faUser,
  faChevronLeft,
  faChevronRight,
);

function App() {
  // NOTE: Cosmetic
  // TODO: Responsiveness + nicer looking UI (aos)
  // TODO: Make the role change animation akin to the google search bar on opera
  // TODO: Make better status change animation / UI
  // TODO: Fix player tab switching to 'null' bug -> after it auto-selects the user as the player and the user changes to a time that has no player info
  // TODO: Don't allow empty setups to be created
  // TODO: Homework tab
  // TODO: Upload images without saving setup to db first
  // TODO: Move icons in setups list ( favorites? )
  // TODO: Strat counter for each map
  // TODO: Grey out save button when there is no unsaved changes
  // TODO: "Tell the little children what to put their eyes on" - Click

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const fetchPlayers = useCallback(async () => {
    const q = query(
      collection(db, "players"),
      where("peek_priority", "!=", null),
    );

    const { docs } = await getDocs(q);

    const players = docs
      .map((player) => ({ ...player.data(), id: player.id }))
      .sort((a, b) => a.peek_priority - b.peek_priority);

    setPlayers(players);
    setLoading(false);
  }, [setPlayers, setLoading]);

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  players={players}
                  loading={loading}
                  fetchPlayers={fetchPlayers}
                />
              }
            />
            <Route path="/maps" element={<Maps />} />
            <Route path="/maps/:mapName" element={<Map players={players} />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
