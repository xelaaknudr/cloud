import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './reducers';
import Alert from './utils/alert/alert';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Alert />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
