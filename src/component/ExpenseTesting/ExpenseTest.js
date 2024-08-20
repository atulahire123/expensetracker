import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomePage from './HomePage';
import rootReducer from '../../store';

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = createStore(rootReducer, reduxState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('HomePage Component', () => {
  test('renders Welcome message', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Welcome to Expense Tracker!!!')).toBeInTheDocument();
  });

  test('toggles theme when Toggle Theme button is clicked', () => {
    renderWithProviders(<HomePage />);
    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    // Assuming theme toggles a class on the body
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  test('shows email verification message if email is not verified', () => {
    renderWithProviders(<HomePage />, {
      reduxState: {
        auth: { isSignup: true, emailVerified: false },
      },
    });
    expect(screen.getByText('Your email is not verified. Please verify your email.')).toBeInTheDocument();
  });

  test('does not show email verification message if email is verified', () => {
    renderWithProviders(<HomePage />, {
      reduxState: {
        auth: { isSignup: true, emailVerified: true },
      },
    });
    expect(screen.queryByText('Your email is not verified. Please verify your email.')).toBeNull();
  });

  test('shows CompleteProfile component if profile is incomplete', () => {
    renderWithProviders(<HomePage />, {
      reduxState: {
        auth: { isSignup: true, emailVerified: true, displayName: null, photoUrl: null },
      },
    });
    expect(screen.getByText('Complete your profile')).toBeInTheDocument();
  });

  test('adds an expense and displays it in the list', async () => {
    renderWithProviders(<HomePage />);
    const inputName = screen.getByLabelText('Expense Name');
    const inputAmount = screen.getByLabelText('Amount');
    const submitButton = screen.getByText('Add Expense');

    fireEvent.change(inputName, { target: { value: 'Test Expense' } });
    fireEvent.change(inputAmount, { target: { value: '100' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Test Expense')).toBeInTheDocument();
    expect(await screen.findByText('100')).toBeInTheDocument();
  });

  test('deletes an expense from the list', async () => {
    renderWithProviders(<HomePage />);
    const deleteButton = screen.getByText('Delete');

    fireEvent.click(deleteButton);

    expect(await screen.queryByText('Test Expense')).toBeNull();
  });

  test('updates an expense in the list', async () => {
    renderWithProviders(<HomePage />);
    const editButton = screen.getByText('Edit');

    fireEvent.click(editButton);
    const inputAmount = screen.getByLabelText('Amount');
    fireEvent.change(inputAmount, { target: { value: '150' } });
    const submitButton = screen.getByText('Update Expense');
    fireEvent.click(submitButton);

    expect(await screen.findByText('150')).toBeInTheDocument();
  });

  test('shows Premium Features section when total expenses exceed 10000', () => {
    renderWithProviders(<HomePage />, {
      reduxState: {
        expenses: { items: [{ amount: 12000 }] },
      },
    });
    expect(screen.getByText('Premium Features')).toBeInTheDocument();
  });

  test('downloads CSV when Download CSV button is clicked', () => {
    renderWithProviders(<HomePage />, {
      reduxState: {
        expenses: { items: [{ name: 'Test Expense', amount: 12000, date: '2024-08-19' }] },
      },
    });
    const downloadButton = screen.getByText('Download CSV');
    fireEvent.click(downloadButton);
    // Add more assertions here to check the download functionality
  });
});
