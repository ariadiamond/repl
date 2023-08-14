import React from 'react';
import ReactDOM from 'react-dom/client';
import _ from 'lodash';
import './index.css';
import App from './App';

// disable JS requests. Does not completely mitigate risk (ie document.createElement()), but helps
window.fetch = () => 'Hi, just disabling this for safety';
window.XMLHttpRequest = String;

const root = ReactDOM.createRoot(document.getElementById('root'));
window._ = _;
window.lodash = _;
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

