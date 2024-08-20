import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HomePage from './HomePage';
import rootReducer from '../../store';
import { fetchProfileData, fetchExpenses, addExpense, deleteExpense, updateExpense } from '../../api'; // Mock API functions

// Mock API responses
jest.mock('../../api', () => ({
  fetchProfileData: jest.fn(),
  fetchExpenses: jest.fn(),
  addExpense: jest.fn(),
  deleteExpense: jest.fn(),
  updateExpense: jest.fn(),
}));

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = createStore(rootReducer, reduxState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('HomePage Component Additional Tests', () => {
  test('displays error message on failed API call', async () => {
    fetchProfileData.mockRejectedValueOnce(new Error('Failed to fetch profile data'));
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Failed to fetch profile data.')).toBeInTheDocument();
  });

  test('shows success message on successful API call', async () => {
    fetchProfileData.mockResolvedValueOnce({ emailVerified: true });
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Profile data fetched successfully.')).toBeInTheDocument();
  });

  test('adds expense and updates the list on success', async () => {
    addExpense.mockResolvedValueOnce({ name: 'New Expense', amount: '50', date: '2024-08-19' });
    renderWithProviders(<HomePage />);
    const inputName = screen.getByLabelText('Expense Name');
    const inputAmount = screen.getByLabelText('Amount');
    const submitButton = screen.getByText('Add Expense');
    
    fireEvent.change(inputName, { target: { value: 'New Expense' } });
    fireEvent.change(inputAmount, { target: { value: '50' } });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('New Expense')).toBeInTheDocument();
    expect(await screen.findByText('50')).toBeInTheDocument();
  });

  test('handles failed expense addition gracefully', async () => {
    addExpense.mockRejectedValueOnce(new Error('Failed to add expense'));
    renderWithProviders(<HomePage />);
    const inputName = screen.getByLabelText('Expense Name');
    const inputAmount = screen.getByLabelText('Amount');
    const submitButton = screen.getByText('Add Expense');

    fireEvent.change(inputName, { target: { value: 'Failing Expense' } });
    fireEvent.change(inputAmount, { target: { value: '100' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Failed to add expense.')).toBeInTheDocument();
  });

  test('deletes expense and updates the list on success', async () => {
    deleteExpense.mockResolvedValueOnce({});
    renderWithProviders(<HomePage />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(await screen.queryByText('Expense to be deleted')).toBeNull();
  });

  test('handles failed expense deletion gracefully', async () => {
    deleteExpense.mockRejectedValueOnce(new Error('Failed to delete expense'));
    renderWithProviders(<HomePage />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(await screen.findByText('Failed to delete expense.')).toBeInTheDocument();
  });

  test('updates expense and shows updated details', async () => {
    updateExpense.mockResolvedValueOnce({ id: '1', name: 'Updated Expense', amount: '150' });
    renderWithProviders(<HomePage />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputAmount = screen.getByLabelText('Amount');
    fireEvent.change(inputAmount, { target: { value: '150' } });
    const submitButton = screen.getByText('Update Expense');
    fireEvent.click(submitButton);

    expect(await screen.findByText('150')).toBeInTheDocument();
  });

  test('handles failed expense update gracefully', async () => {
    updateExpense.mockRejectedValueOnce(new Error('Failed to update expense'));
    renderWithProviders(<HomePage />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputAmount = screen.getByLabelText('Amount');
    fireEvent.change(inputAmount, { target: { value: '200' } });
    const submitButton = screen.getByText('Update Expense');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Failed to update expense.')).toBeInTheDocument();
  });

  test('handles profile data loading state', async () => {
    fetchProfileData.mockReturnValueOnce(new Promise(() => {})); // Return a pending promise
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Loading profile data...')).toBeInTheDocument();
  });

  test('correctly displays total expenses', async () => {
    fetchExpenses.mockResolvedValueOnce([
      { id: '1', name: 'Expense 1', amount: '200' },
      { id: '2', name: 'Expense 2', amount: '300' },
    ]);
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Total: 500')).toBeInTheDocument();
  });

  test('handles API error in expense listing gracefully', async () => {
    fetchExpenses.mockRejectedValueOnce(new Error('Failed to fetch expenses'));
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Failed to fetch expenses.')).toBeInTheDocument();
  });
});
