import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, setExpenses } from '../../store/actions/expenseActions';

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const token = useSelector((state) => state.auth.token); // Ensure token is correctly set
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) {
        console.error('No token available');
        return;
      }

      try {
        const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses.json?auth=${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }

        const data = await response.json();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        dispatch(setExpenses(loadedExpenses));
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [dispatch, token]);

  const addExpenseHandler = () => {
    if (amount.trim().length === 0) {
      return;
    }
    const newExpense = { id: Date.now(), amount: parseFloat(amount) }; // Ensure id is unique
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
