import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AuthModal from "./components/AuthModal/AuthModal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

function App() {
  // TODO: Responsiveness
  // Firestore database rules are defined as public - determine best way to protect
  // Pages for every map - decide how to break up the data and where we want to put everything
  // Once that's decided, set up the UI and database to add strats, positions, util, etc.

  return (
    <div className="App">
      <Navbar />
      <AuthModal />
    </div>
  );
}

export default App;
