import React, { useState, useContext, useEffect } from 'react';
import { ref, push, set, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Corrected path
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import { AuthContext } from '../../context/AuthContext'; // Corrected import path

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const authCtx = useContext(AuthContext);
  const email = authCtx.user.email.replace('@', '').replace('.', '');

  useEffect(() => {
    const fetchExpenses = async () => {
      const expensesRef = ref(database, `expenses/${email}`);
      onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key],
          });
        }
        setExpenses(loadedExpenses);
      });
    };

    fetchExpenses();
  }, [email]);

  const addExpenseHandler = async (expense) => {
    try {
      const newExpenseRef = await push(ref(database, `expenses/${email}`), expense);
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          id: newExpenseRef.key,
          ...expense,
        },
      ]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      await set(ref(database, `expenses/${email}/${id}`), null);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAddExpense={addExpenseHandler}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
      <ExpenseItem
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        onEditHandler={editExpenseHandler}
      />
    </div>
  );
};

export default ExpenseTracker;
