import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './MainNavigation.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <h3>Expense Tracker</h3>
        </Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Product</Nav.Link>
          <Nav.Link href="#">About us</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;