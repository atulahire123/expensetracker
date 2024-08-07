import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <ListGroup>
      {expenses.map((expense) => (
        <ListGroup.Item key={expense.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{expense.description}</h5>
              <p>Amount: ${expense.amount}</p>
              <p>Date: {expense.date}</p>
            </div>
            <div>
              <Button variant="secondary" onClick={() => onEditExpense(expense)}>Edit</Button>
              <Button variant="danger" onClick={() => onDeleteExpense(expense.id)}>Delete</Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onEditExpense: PropTypes.func.isRequired,
};

export default ExpenseList;
