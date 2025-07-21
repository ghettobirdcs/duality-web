import React, { useState } from "react";
import "./Home.css";

import AuthModal from "../../components/AuthModal/AuthModal";
import Navbar from "../../components/Navbar/Navbar";
import Players from "../../components/Players/Players";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

const Home = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Navbar onSignIn={openModal} />
      <AuthModal modalOpen={modalOpen} onClose={closeModal} />
      <Players />
      {user?.A_Team === true && <AdminDashboard />}
    </div>
  );
};

export default Home;
