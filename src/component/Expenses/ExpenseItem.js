import React from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';

const ExpenseItem = ({ expenses, onDelete, onEdit, isLoading }) => {
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
              <div>
                <Button variant="secondary" onClick={() => onEdit(expense)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(expense.id)} className="ms-2">
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default ExpenseItem;
