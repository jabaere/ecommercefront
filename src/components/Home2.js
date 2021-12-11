
/*
import React from "react";
//import { Link } from "react-router-dom";
import alogo from "../assets/alogo.png";
import vectorUp from "../assets/VectorUp.png";
import vectorDown from "../assets/Vector.png";
import cart from "../assets/cart.png";
import GlobalContext from "../context/GlobalVars";
import HeaderCart from "./HeaderCart";
import All from "./All";
import Tech from "./Tech";
import Clothes from "./Clothes";
import Item from "./Item";
import react from "react";
import Cart from "./Cart";
//import {useNavigate} from 'react-router-dom';
class Home2 extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    
    this.myRef = React.createRef();
    this.category = react.createRef()
    this.category2 = react.createRef()
    this.category3 = react.createRef()
    
    this.state = {
      vectorDown: vectorDown,
      vectorUp: vectorUp,
      vectorToggle: true,
      currencyToggle: false,
      cartToggle: false,
      totalPrice: "$100",
      individualItemCount: 1,
      individualItemPrice: "$50.00",
      outOfStock: true,
      currencyIcon: "",
      data: [],
      cartData: [],
      content: <All/>,
      mounted: false
    };
    //this.closePopUp = this.closePopUp.bind(this);
  }


  render() {
    const {
      currencyIcon,
      cartDatatest,
      cartToggle,
      currencyToggle,
      vectorToggle,
      setCurrencyToggleAndCartToggle,
    } = this.context;
    

    const xdAllItemsCount = cartDatatest.filter((a) => a.quantity > 0).length;
    const itemIndividualCountFor = cartDatatest.reduce(
      (total, item) => item.quantity + total,
      0
    );
    const itemIndividualCountFor2 = itemIndividualCountFor - xdAllItemsCount;
    //console.log(itemIndividualCountFor);
    window.localStorage.setItem("cartCount", xdAllItemsCount);
    //window.localStorage.setItem("itemIndividualCountFor2", itemIndividualCountFor2);
    // setCartCount(xdAllItemsCount)
    return (
      <>
     
      <div>
        {this.state.content }
      </div>
      </>
    );
  }
}

export default Home2;

*/