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
} from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faComment, faArrowLeft);

function App() {
  // TODO: Responsiveness
  // Firestore database rules are defined as public - determine best way to protect
  // TODO: Loading states for onAuthStateChanged and map slides

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/maps/:mapName" element={<Map />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
