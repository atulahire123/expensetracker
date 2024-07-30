const initialState = {
    expenses: [],
    totalAmount: 0,
  };
  
  const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        const updatedTotalAmount = state.totalAmount + action.payload.amount;
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
          totalAmount: updatedTotalAmount,
        };
      case 'SET_EXPENSES':
        const totalAmount = action.payload.reduce((sum, expense) => sum + expense.amount, 0);
        return {
          ...state,
          expenses: action.payload,
          totalAmount,
        };
      default:
        return state;
    }
  };
  
  export default expensesReducer;