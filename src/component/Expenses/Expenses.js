import React, { useState, useContext } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { AuthContext } from '../context/AuthContext';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const authCtx = useContext(AuthContext);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Expenses;
