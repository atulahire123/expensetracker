import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      price: moneySpent,
      description,
      category
    };
    onAddExpense(newExpense);
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="expense-container">
      <Card className="card">
        <Card.Body>
          <Card.Title className="text-center card-title">Add Daily Expense</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="moneySpent">
              <Form.Label>Money Spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={moneySpent}
                onChange={(e) => setMoneySpent(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                {/* Add more categories as needed */}
              </Form.Control>
            </Form.Group>
            <Button type="submit" className="btn1">
              Add Expense
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExpenseForm;