import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.css';
import { createStore } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';

/*const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);*/

const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
