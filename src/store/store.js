// src/store/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import expensesReducer from './reducers/expensesReducer';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
