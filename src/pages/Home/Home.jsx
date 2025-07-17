import React from "react";

import AuthModal from "../../components/AuthModal/AuthModal";
import Navbar from "../../components/Navbar/Navbar";
import Players from "../../components/Players/Players";

const Home = () => {
  return (
    <div>
      <Navbar />
      <AuthModal />
      <Players />
    </div>
  );
};

export default Home;
