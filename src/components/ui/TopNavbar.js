import React, { useContext, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import {Nav, Navbar,NavDropdown } from "react-bootstrap";


import { AuthContext } from "../../auth/AuthContext";
import { AuthModal } from "../auth/AuthModal";
import { logout } from "../../actions/auth";

export const TopNavbar = () => {

  const { user, dispatch } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false)
  const history = useHistory();


  
  // const history = useHistory();
  
  const handleLogin = () => {
    setShowModal(true);  
  };
  
  const handleLogout = () => {
    logout(dispatch, history);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Navbar bg="light" expand="sm" >
    <Navbar.Brand >
    <Link className="navbar-brand ms-2" to="/">
        Marketplace
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        {
            user.logged
            ?( 
              <NavDropdown title={user.name} id="basic-nav-dropdown">
          <NavDropdown.Item   >Cuenta</NavDropdown.Item>
          <NavDropdown.Item  >...</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item   onClick={handleLogout} >cerrar sesion</NavDropdown.Item>
        </NavDropdown>
            )
            :(
              <button onClick={handleLogin} className="nav-item nav-link btn">
                Iniciar Sesion
              </button>
              )
          }
          {!user.logged && showModal && (
            <AuthModal handleCloseModal={handleCloseModal} />
          )}
        
      </Nav>
    </Navbar.Collapse>

</Navbar>
  );
};
