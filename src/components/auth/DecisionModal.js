import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const DecisionModal = ({ handleCloseModal,handleLogin,handleRegister }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseModal();
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea una Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registrate o inicia sesion para empezar a agregar productos
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleLogin}>
            INICIA SESION
          </Button>
          <Button variant="secondary" onClick={handleRegister}>
            REGISTRATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
