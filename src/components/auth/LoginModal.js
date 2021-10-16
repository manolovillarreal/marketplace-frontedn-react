import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { startLogin } from "../../actions/auth";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "../../hooks/useForm";

export const LoginModal = ({ handleCloseModal }) => {
  
  const {dispatch} = useContext(AuthContext)
  
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({show:false, message:''});
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseModal();
  };

  const [{ email, password }, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;    

    setShowAlert({show:false,message:''});
    setValidated(true);
    
    if (form.checkValidity() === true) {
       const data = await startLogin(email,password,dispatch);
       if(!data.user){
         console.log(data);
          setShowAlert({show:true,message:data.msg});
       }
       else{
        handleClose();
       }
    }

  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesion
          </Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
       
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su correo.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese su contraseña.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            
          </Form>
        </Modal.Body>
        <Modal.Footer >
        <Alert  variant="danger" show={showAlert.show} style={{flex:1}}>
            {showAlert.message}
          </Alert>
        </Modal.Footer>
      </Modal>
    </>
  );
};
