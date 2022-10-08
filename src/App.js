import React from "react";
import {Switch, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";
import Item from "./components/Item";
import All from "./components/All";
import { GlobalProvider } from "../src/context/GlobalVars";
import HeaderLittle from "./components/HeaderLittle";
import SideBar from "./components/SideBar";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    const location = this.props.location;
    
    return (
      <GlobalProvider>
        <div className="App container-width">
          <HeaderLittle />
          <div className="container">
            {["/tech", "/clothes", "/"].some(
              (a) => a === location.pathname
            ) && <SideBar />}
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
          </div>
        </div>
      </GlobalProvider>
    );
  }
}

export default withRouter(App);
