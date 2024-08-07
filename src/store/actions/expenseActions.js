export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  payload: expenses,
});
