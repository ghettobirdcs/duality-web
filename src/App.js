import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment, faXmark } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";

library.add(faXmark, faComment);

function App() {
  // TODO: Responsiveness
  // Firestore database rules are defined as public - determine best way to protect
  // Pages for every map - decide how to break up the data and where we want to put everything
  // Once that's decided, set up the UI and database to add strats, positions, util, etc.

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
