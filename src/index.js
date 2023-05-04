import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './component/redux/Reducers/index';
import MainComponent from './component/mainComponent';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BrowserRouter>
<Provider store={store}>
<MainComponent  />
</Provider>
</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
