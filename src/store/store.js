import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import expensesReducer from './reducers/expensesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(rootReducer);

export default store;
