import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense, isLoading }) => {
  return (
    <div>
      <ExpenseItem
        expenses={expenses}
        onDelete={onDeleteExpense}
        onEdit={onEditExpense}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ExpenseList;








