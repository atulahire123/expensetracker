import React, { useRef, useState, useEffect, useContext } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';

const ExpenseForm = ({ onAddExpense, editingExpense, onUpdateExpense }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      descriptionRef.current.value = editingExpense.description;
      amountRef.current.value = editingExpense.amount;
      dateRef.current.value = editingExpense.date;
    }
  }, [editingExpense]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredDescription = descriptionRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredDate = dateRef.current.value;

    if (enteredDescription.trim().length === 0 || enteredAmount.trim().length === 0 || enteredDate.trim().length === 0) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);

    const expenseData = {
      description: enteredDescription,
      amount: enteredAmount,
      date: enteredDate,
    };

    try {
      let url = `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}.json?auth=${authCtx.token}`;
      let method = 'POST';
      if (editingExpense) {
        url = `https://expensetracker-1a25f-default-rtdb.firebaseio.com/expenses/${authCtx.userId}/${editingExpense.id}.json?auth=${authCtx.token}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(expenseData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save expense.');
      }

      const data = await response.json();
      if (editingExpense) {
        onUpdateExpense({ id: editingExpense.id, ...expenseData });
      } else {
        onAddExpense({ id: data.name, ...expenseData });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" ref={descriptionRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" ref={amountRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" ref={dateRef} />
      </Form.Group>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" size="sm" /> : (editingExpense ? 'Update Expense' : 'Add Expense')}
      </Button>
    </Form>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.object,
  onUpdateExpense: PropTypes.func.isRequired,
};

export default ExpenseForm;
