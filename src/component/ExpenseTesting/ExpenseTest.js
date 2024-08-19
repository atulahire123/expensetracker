import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders AuthForm on default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const signupElement = screen.getByText(/Sign Up/i); // Adjust text to match your AuthForm component
  expect(signupElement).toBeInTheDocument();
});

test('renders HomePage on /home route', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
    </MemoryRouter>
  );
  const homePageElement = screen.getByText(/Home Page/i); // Adjust text to match your HomePage component
  expect(homePageElement).toBeInTheDocument();
});

test('renders CompleteProfile on /complete-profile route', () => {
  render(
    <MemoryRouter initialEntries={['/complete-profile']}>
      <App />
    </MemoryRouter>
  );
  const completeProfileElement = screen.getByText(/Complete Your Profile/i); // Adjust text to match your CompleteProfile component
  expect(completeProfileElement).toBeInTheDocument();
});

test('renders Expenses on /expenses route', () => {
  render(
    <MemoryRouter initialEntries={['/expenses']}>
      <App />
    </MemoryRouter>
  );
  const expensesElement = screen.getByText(/Expenses/i); // Adjust text to match your Expenses component
  expect(expensesElement).toBeInTheDocument();
});
