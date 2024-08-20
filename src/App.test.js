import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

test('renders Expense Tracker heading', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const headingElement = screen.getByText(/Expense Tracker/i);
  expect(headingElement).toBeInTheDocument();
});
