import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { store } from './reducers'
import { Provider } from 'react-redux';
import Alert from '../src/utils/alert/alert'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App {...store.getState()}/>
      <Alert />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
