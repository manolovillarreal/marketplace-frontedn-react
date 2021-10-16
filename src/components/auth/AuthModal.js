import React, { useEffect, useState } from "react";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import { DecisionModal } from "../auth/DecisionModal";

export const AuthModal = ({ handleCloseModal }) => {
  const [showDecision, setShowDecision] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => {
    handleCloseModal();
  };

  const handleShowFirst = () => setShowDecision(true);

  const handleLogin = () => {
    setShowDecision(false);
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowDecision(false);
    setShowRegister(true);
  };

  useEffect(() => {
    handleShowFirst();
  }, []);

  return (
    <>
      {showDecision  && <DecisionModal handleCloseModal={handleClose} handleLogin={handleLogin} handleRegister={handleRegister}/>}
      {!showDecision && showLogin && <LoginModal handleCloseModal={handleClose}/>}
      {!showDecision && showRegister && <RegisterModal handleCloseModal={handleClose} role="SELLER_ROLE"/>}
    </>
  );
};
