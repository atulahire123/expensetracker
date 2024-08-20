import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseForm from '../Expenses/ExpenseForm';
import ExpenseList from '../Expenses/ExpenseList';
import CompleteProfile from './CompleteProfile';
import { themeActions } from '../../store/theme-slice';
import { setExpenses, deleteExpense } from '../../store/expensesSlice'; // Combined imports

import './HomePage.css';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const themeState = useSelector((state) => state.theme.darkMode);
  console.log(userId);

  useEffect(() => {
    if (userId && token) {
      fetchProfileData(token);
      fetchExpenses(userId, token);
    }
  }, [userId, token]);

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken: token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const user = data.users[0];
        setEmailVerified(user.emailVerified);
        if (!user.displayName || !user.photoUrl) {
          setShowCompleteProfile(true);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch profile data:', errorData.error.message);
      }
    } catch (error) {
      console.error('Failed to fetch profile data.', error);
    }
  };

  const fetchExpenses = async (userId, token) => {
    try {
      const response = await fetch(
        `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${userId}.json?auth=${token}`
      );
      if (response.ok) {
        const data = await response.json();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key],
          });
        }
        console.log(loadedExpenses);
        setExpenses(loadedExpenses);
        dispatch(setExpenses(loadedExpenses)); // Sync Redux store with fetched expenses
      } else {
        console.error('Failed to fetch expenses.');
      }
    } catch (error) {
      console.error('Failed to fetch expenses.', error);
    }
  };

  const addExpenseHandler = async (expense) => {
    try {
      const response = await fetch(
        `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${userId}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expense),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          { id: data.name, ...expense },
        ]);
      } else {
        console.error('Failed to add expense.');
      }
    } catch (error) {
      console.error('Failed to add expense.', error);
    }
  };

  const handleDeleteitem = async (id) => {
    console.log('Attempting to delete expense with id:', id);
    try {
      const response = await fetch(
        `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json?auth=${token}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // Log response to check
        console.log('Expense deleted successfully:', await response.json());

        // Remove the item from local state
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);

        // Update the Redux store
        dispatch(deleteExpense(id));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete expense:', errorData);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const updateExpenseHandler = async (updatedExpense) => {
    try {
      const response = await fetch(
        `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${userId}/${updatedExpense.id}.json?auth=${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          )
        );
        setEditingExpense(null);
      } else {
        console.error('Failed to update expense.');
      }
    } catch (error) {
      console.error('Failed to update expense.', error);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadCSV = (expenses) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      expenses.map((expense) => `${expense.name},${expense.amount},${expense.date}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const isSignup = localStorage.getItem('isSignup') === 'true';

  return (
    <div className={`homepage-container ${themeState ? 'dark' : 'light'}`}>
      <h3 className="header">Welcome to Expense Tracker!!!</h3>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>
      {isSignup && !emailVerified && (
        <div className="verification-message">
          <p>Your email is not verified. Please verify your email.</p>
        </div>
      )}
      {showCompleteProfile && <CompleteProfile />}
      <ExpenseForm
        onAddExpense={addExpenseHandler}
        editingExpense={editingExpense}
        onUpdateExpense={updateExpenseHandler}
        userId={userId}
        token={token}
      />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={handleDeleteitem}
        onEditExpense={updateExpenseHandler}
      />
      {totalExpenses >= 10000 && (
        <div className="premium-section">
          <h3>Premium Features</h3>
          <button onClick={() => downloadCSV(expenses)}>Download CSV</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
