import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// import App from './components/app';
import reducers from './reducers';
import App from './component/App';
// import Nav from './containers/Nav';
// import Map from './containers/Map';
// import Panel from './containers/Panel';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.app'));
