import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ExpenseForm = ({ onAddExpense, editingExpense, onUpdateExpense, userId, token }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
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
      setError('Please fill out all fields.');
      return;
    }

    const expenseData = {
      description: enteredDescription,
      amount: parseFloat(enteredAmount),
      date: enteredDate,
    };

    setIsLoading(true);
    setError(null);

    try {
      if (editingExpense) {
        await onUpdateExpense({ ...expenseData, id: editingExpense.id });
      } else {
        await onAddExpense(expenseData);
      }

      descriptionRef.current.value = '';
      amountRef.current.value = '';
      dateRef.current.value = '';
    } catch (error) {
      setError('Failed to submit expense.');
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" ref={descriptionRef} placeholder="Enter expense description" />
      </Form.Group>
      <Form.Group controlId="amount" className="mt-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" ref={amountRef} placeholder="Enter amount" />
      </Form.Group>
      <Form.Group controlId="date" className="mt-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" ref={dateRef} />
      </Form.Group>
      <Button type="submit" className="mt-3" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" size="sm" /> : editingExpense ? 'Update Expense' : 'Add Expense'}
      </Button>
    </Form>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.object,
  onUpdateExpense: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default ExpenseForm;
