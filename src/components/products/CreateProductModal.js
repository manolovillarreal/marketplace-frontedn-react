import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { addNewProduct } from "../../actions/products";
import { useForm } from "../../hooks/useForm";

export const CreateProductModal = ({ setShowModal,setProductsList }) => {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, errors: [] });
  const [validated, setValidated] = useState(false);

  const [{ name, sku, price, stock }, handleInputChange] = useForm({
    name: "",
    sku: "",
    price: 0,
    stock: 0,
  });

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setValidated(true);

    if (form.checkValidity() === true) {
      const data = await addNewProduct(name,sku,price,stock);
      if (!data.ok) {
        console.log(data);
        setShowAlert({ show: true, errors: data.errors });
      } else {
        setProductsList(products => [...products,data.product]);
        handleClose();
      }
    }
  };
  useEffect(() => {
    setShow(true);
    return () => {
    }
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
              <Form.Label>SKU</Form.Label>
              <Form.Control
                name="sku"
                type="text"
                value={sku}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese el codigo sku para su producto.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={price}
                onChange={handleInputChange}
                required
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                Por favor asigne un precio a su producto.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                value={stock}
                onChange={handleInputChange}
                required
                min="0"
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
            {showAlert.errors.map((error, index) => (
              <li key={index}>
                <small>{error.msg}</small>{" "}
              </li>
            ))}
          </Alert>
        </Modal.Footer>
      </Modal>
    </>
  );
};
