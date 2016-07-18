import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.jsx';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')
);