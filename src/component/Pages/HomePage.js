import React, { useState, useEffect, useContext } from 'react';
import CompleteProfile from './CompleteProfile';
import ExpenseForm from '../Expenses/ExpenseForm';
import ExpenseList from '../Expenses/ExpenseList';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfileData(token);
      fetchExpenses(token);
    }
  }, []);

  const fetchProfileData = async (token) => {
    console.log('Fetching profile data with token:', token); // Debugging statement
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.users[0];
        setEmailVerified(user.emailVerified);
        if (!user.displayName || !user.photoUrl) {
          setShowCompleteProfile(true);
        }
      } else {
        console.log('Failed to fetch profile data.');
      }
    } catch (error) {
      console.log('Failed to fetch profile data.', error);
    }
  };

  const fetchExpenses = async (token) => {
    console.log('Fetching expenses with token:', token, 'userId:', authCtx.userId); // Debugging statement
    try {
      const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}.json?auth=${token}`);
      if (response.ok) {
        const data = await response.json();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key]
          });
        }
        setExpenses(loadedExpenses);
      } else {
        console.log('Failed to fetch expenses.');
      }
    } catch (error) {
      console.log('Failed to fetch expenses.', error);
    }
  };

  const addExpenseHandler = async (expense) => {
    const token = localStorage.getItem('token');
    console.log('Adding expense with token:', token, 'userId:', authCtx.userId); // Debugging statement
    try {
      const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, { id: data.name, ...expense }]);
      } else {
        console.log('Failed to add expense.');
      }
    } catch (error) {
      console.log('Failed to add expense.', error);
    }
  };

  const deleteExpenseHandler = async (expenseId) => {
    const token = localStorage.getItem('token');
    console.log('Deleting expense with token:', token, 'userId:', authCtx.userId); // Debugging statement
    try {
      const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}/${expenseId}.json?auth=${token}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== expenseId));
        console.log("Expense successfully deleted");
      } else {
        console.log('Failed to delete expense.');
      }
    } catch (error) {
      console.log('Failed to delete expense.', error);
    }
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
  };

  const updateExpenseHandler = async (updatedExpense) => {
    const token = localStorage.getItem('token');
    console.log('Updating expense with token:', token, 'userId:', authCtx.userId); // Debugging statement
    try {
      const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}/${updatedExpense.id}.json?auth=${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });

      if (response.ok) {
        setExpenses((prevExpenses) => prevExpenses.map(expense => 
          expense.id === updatedExpense.id ? updatedExpense : expense
        ));
        setEditingExpense(null);
      } else {
        console.log('Failed to update expense.');
      }
    } catch (error) {
      console.log('Failed to update expense.', error);
    }
  };

  const sendVerificationEmail = async () => {
    console.log('Sending verification email with token:', authCtx.token); // Debugging statement
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: authCtx.token,
        }),
      });

      if (response.ok) {
        setVerificationSent(true);
        alert('Verification email sent. Please check your inbox.');
      } else {
        console.log('Failed to send verification email.');
      }
    } catch (error) {
      console.log('Failed to send verification email.', error);
    }
  };

  return (
    <div className="homepage-container">
      <h3 className="header">Welcome to Expense Tracker!!!</h3>
      {!emailVerified && !verificationSent && (
        <div className="verification-message">
          <p>Your email is not verified. Please verify your email.</p>
          <button onClick={sendVerificationEmail} className="btn-link">
            Verify Email
          </button>
        </div>
      )}
      {verificationSent && <p>Verification email sent. Please check your inbox.</p>}
      {showCompleteProfile && <CompleteProfile />}
      {emailVerified && (
        <>
          <ExpenseForm onAddExpense={addExpenseHandler} editingExpense={editingExpense} onUpdateExpense={updateExpenseHandler} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpenseHandler} onEditExpense={editExpenseHandler} />
        </>
      )}
    </div>
  );
};

export default HomePage;
