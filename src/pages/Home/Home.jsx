import React, { useState } from "react";

import AuthModal from "../../components/AuthModal/AuthModal";
import Navbar from "../../components/Navbar/Navbar";
import Players from "../../components/Players/Players";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Navbar onSignIn={openModal} />
      <AuthModal modalOpen={modalOpen} onClose={closeModal} />
      <Players />
    </div>
  );
};

export default Home;
