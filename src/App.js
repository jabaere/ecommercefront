import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
//import Home from "./components/Home";
import Cart from "./components/Cart";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";
import Item from "./components/Item";
//import Home2 from "./components/Home2";
import All from "./components/All";
//import Home from "./components/Home";
import { GlobalProvider } from "../src/context/GlobalVars";
import HeaderLittle from "./components/HeaderLittle";
//import { createHashHistory } from 'history';
//export const history = createHashHistory();
//import gql from 'graphql-tag'
class App extends React.Component {
  render() {
    return (
      <GlobalProvider>
        <div className="App">

      
          <Router /*history={history}*/>
          <HeaderLittle/>
            <Switch>
              <Route exact path="/">
                
                <All />
              </Route>
              <Route path="/cart">
                
                <Cart />
              </Route>
              <Route path="/clothes">
               
                <Clothes />
              </Route>
              <Route path="/tech">
               
                <Tech />
              </Route>
              <Route path="/item">
             
                <Item />
              </Route>
            </Switch>
          </Router>
        </div>
      </GlobalProvider>
    );
  }
}

export default App;
