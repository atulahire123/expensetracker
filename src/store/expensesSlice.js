// src/store/expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.items.push(action.payload);
      state.totalAmount += action.payload.amount;
    },
    setExpenses(state, action) {
      state.items = action.payload;
      state.totalAmount = action.payload.reduce((sum, expense) => sum + expense.amount, 0);
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
