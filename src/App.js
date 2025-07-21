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
} from "@fortawesome/free-solid-svg-icons";
import { AuthProvider } from "./auth/AuthContext";

library.add(faXmark, faComment, faArrowLeft, faPlus, faCheck);

function App() {
  // TODO: Responsiveness
  // TODO: Add Created By: [user] in the setups list
  // TODO: List all setups?

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
