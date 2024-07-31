// src/component/Expenses/Expenses.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, setExpenses } from '../../store/actions/expenseActions';
//import './Expenses.css';

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        dispatch(setExpenses(data));
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };

    fetchExpenses();
  }, [dispatch, token]);

  const addExpenseHandler = () => {
    const newExpense = { id: Date.now(), amount: parseFloat(amount) };
    dispatch(addExpense(newExpense));
    setAmount('');
  };

  return (
    <div className="expenses">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addExpenseHandler}>Add Expense</button>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.amount}</li>
        ))}
      </ul>
      {totalAmount > 10000 && <button>Activate Premium</button>}
    </div>
  );
};

export default Expenses;
