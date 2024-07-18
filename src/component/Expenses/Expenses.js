import React, { useState, useEffect, useContext } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../firebase';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { AuthContext } from '../context/AuthContext';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expensesRef = ref(database, `expenses/${authCtx.userId}`);
      onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setExpenses(loadedExpenses);
        }
      });
    };

    fetchExpenses();
  }, [authCtx.userId]);

  const addExpenseHandler = async (expense) => {
    try {
      const newExpenseRef = await push(ref(database, `expenses/${authCtx.userId}`), expense);
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          id: newExpenseRef.key,
          ...expense
        }
      ]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Expenses;
