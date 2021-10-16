import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { startRegister } from "../../actions/auth";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "../../hooks/useForm";

export const RegisterModal = ({ handleCloseModal,role }) => {
  const { dispatch } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, errors: [] });
  const [validated, setValidated] = useState(false);

  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [{ name, email, password, confirm }, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleClose = () => {
    setShow(false);
    handleCloseModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setValidated(true);

    if (form.checkValidity() === true && validateConfirm()) {
      const data = await startRegister(name, email, password,role, dispatch);
      if (!data.user) {
        console.log(data);
        setShowAlert({ show: true, errors: data.errors });
      } else {
        handleClose();
      }
    }
  };

  const validateConfirm = () => {
    let isValid = false;

    if (password.length >= 8) {
      if (password !== confirm) {
        setValidated(false);
        if (!confirmRef.current.classList.contains("is-invalid"))
          confirmRef.current.classList.add("is-invalid");
      } else {
        isValid = true;
        if (confirmRef.current.classList.contains("is-invalid"))
          confirmRef.current.classList.remove("is-invalid");
        if (!confirmRef.current.classList.contains("is-valid"))
          confirmRef.current.classList.add("is-valid");
      }
    }
    return isValid;
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea una Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={name}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo valido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                required
                minLength="8"
                ref={passwordRef}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese al menos 8 digitos para su contraseña.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Confirmar conntraseña</Form.Label>
              <Form.Control
                name="confirm"
                type="password"
                value={confirm}
                onChange={handleInputChange}
                required
                minLength="8"
                ref={confirmRef}
              />
              <Form.Control.Feedback type="invalid">
                Las contraseñas no coinciden.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Alert variant="danger" show={showAlert.show} style={{ flex: 1 }}>
            {
              showAlert.errors.map((error,index) => (
              <li key={index} ><small>{error.msg}</small> </li>
            ))}
          </Alert>
        </Modal.Footer>
      </Modal>
    </>
  );
};
