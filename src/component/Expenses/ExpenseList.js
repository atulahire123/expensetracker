// src/components/ExpenseList.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ExpenseList = ({ expenses }) => {
  return (
    <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '1rem' }}>
      <Card.Body>
        <Card.Title>Expenses</Card.Title>
        <ListGroup>
          {expenses.map((expense) => (
            <ListGroup.Item key={expense.id}>
              <div>
                <strong>Price:</strong> {expense.price}
              </div>
              <div>
                <strong>Description:</strong> {expense.description}
              </div>
              <div>
                <strong>Category:</strong> {expense.category}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ExpenseList;
