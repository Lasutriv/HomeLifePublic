import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/general/Index.css';
import { Provider } from 'react-redux';
import { store } from './AppStore'
import App from './App';
// import reportWebVitals from "./reportWebVitals";
// https://react-icons.github.io/react-icons

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals();