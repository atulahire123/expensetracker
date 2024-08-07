import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
//import HomePage from '../Pages/HomePage';
import './MainNavigation.css';
import ThemeToggle from './ThemeToggle';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { state: themeState } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  };

  const loginHandler = () => {
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className={`custom-navbar ${themeState.darkMode ? 'dark' : 'light'}`}>
      <Container fluid>
        <Navbar.Brand href="#">
          <h3>Expense Tracker</h3>
        </Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
          <Nav.Link href="/">Sign in</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          {authCtx.isLoggedIn ? (
            <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link>
          ) : (
            <Nav.Link onClick={loginHandler}>Log In</Nav.Link>
          )}
          <ThemeToggle />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
