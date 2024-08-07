import React from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ExpenseItem = ({ expenses, onDelete, isLoading }) => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json?auth=${token}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense.');
      }

      onDelete(id);
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  return (
    <ListGroup>
      {isLoading && <Spinner animation="border" />}
      {!isLoading && expenses.length === 0 && <p>No expenses found.</p>}
      {!isLoading &&
        expenses.map((expense) => (
          <ListGroup.Item key={expense.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1">{expense.description}</p>
                <small>{expense.amount} - {expense.date}</small>
              </div>
              <Button variant="danger" onClick={() => handleDelete(expense.id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default ExpenseItem;
