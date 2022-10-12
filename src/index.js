import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/cart.css';
import './styles/cartddropdown.css';
import './styles/currency.css';
import './styles/header.css';
import './styles/home.css';
import './styles/pdp.css';
import './styles/popup.css'
import './styles/sideBar.css'
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
     <Router /*history={history}*/>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

