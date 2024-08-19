import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice'; // Corrected import
import './MainNavigation.css';
import ThemeToggle from './ThemeToggle';


const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);


  const logoutHandler = () => {
    dispatch(authActions.logoutHandler()); // Dispatching logout action using authActions
    navigate('/login'); // Navigate to login page after logout
    
  };
  
    
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <h3>Expense Tracker</h3>
        </Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          {isAuthenticated ? (
            <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link>
          ) : (
            <Nav.Link href="/login">Log In</Nav.Link>
          )}
          <ThemeToggle />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
