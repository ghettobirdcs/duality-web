import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
