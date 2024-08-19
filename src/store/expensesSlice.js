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
    deleteExpense(state, action) {
      const deletedExpense = state.items.find(item => item.id === action.payload);
      if (deletedExpense) {
        state.totalAmount -= deletedExpense.amount;
      }
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Exporting actions in a single object
export const { addExpense, setExpenses, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
