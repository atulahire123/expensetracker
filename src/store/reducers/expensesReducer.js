const initialState = {
  expenses: [],
  totalAmount: 0,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
        totalAmount: action.payload.reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
      };
    case 'ADD_EXPENSE':
      const updatedExpenses = [...state.expenses, action.payload];
      return {
        ...state,
        expenses: updatedExpenses,
        totalAmount: updatedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
      };
    default:
      return state;
  }
};

export default expensesReducer;
