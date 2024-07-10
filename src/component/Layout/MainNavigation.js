import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './MainNavigation.css';

const MainNavigation = () => {
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
          <Nav.Link href="#">LogOut</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
