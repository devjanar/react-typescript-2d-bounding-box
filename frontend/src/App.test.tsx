import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render } from '@testing-library/react';
import App from './App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const renderTestedComponent = (app: any) => {
  return render(
      <Provider store={store}>
        <App />
      </Provider>
  );
};

test('renders learn react link', () => {
  const { getByText } = renderTestedComponent(<App />);
  const linkElement = getByText(/Bounding Box Image Labelling/i);
  expect(linkElement).toBeInTheDocument();
});
