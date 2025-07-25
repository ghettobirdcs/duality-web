import React, { useEffect, useState } from "react";
import "./Home.css";

import AuthModal from "../../components/AuthModal/AuthModal";
import Navbar from "../../components/Navbar/Navbar";
import Players from "../../components/Players/Players";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import { useAuth } from "../../auth/AuthContext";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    modalOpen && (document.body.style.overflow = "hidden");
    !modalOpen && (document.body.style.overflow = "");
  }, [modalOpen]);

  const { user } = useAuth();

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
