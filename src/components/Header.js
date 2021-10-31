import React from "react";
import { Link } from "react-router-dom";
import alogo from "../assets/alogo.png";
import vectorUp from "../assets/VectorUp.png";
import vectorDown from "../assets/Vector.png";
import cart from "../assets/cart.png";
import GlobalContext from "../context/GlobalVars";
import HeaderCart from "../components/HeaderCart";



class Header extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
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
    };
    this.closePopUp = this.closePopUp.bind(this);
  }

  categoryClick(e) {
    //console.log(e.currentTarget.id);

    if (e.currentTarget.id === "tech") {
      e.currentTarget.style.cssText = `
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
    height:56px;
   
    font-weight: 600;
    `;
      document.getElementById("clothes").style.cssText = `
    color: black; 
    border-bottom: none;
    font-weight: 400;
  `;
      document.getElementById("all").style.cssText = `
  color: black; 
  border-bottom: none;
  font-weight: 400;
`;
    }
    if (e.currentTarget.id === "all") {
      e.currentTarget.style.cssText = `
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
    height:56px;
    
    font-weight: 600;
    `;
      document.getElementById("clothes").style.cssText = `
    color: black; 
    border-bottom: none;
    font-weight: 400;
  `;
      document.getElementById("tech").style.cssText = `
  color: black; 
  border-bottom: none;
  font-weight: 400;
`;
    }
    if (e.currentTarget.id === "clothes") {
      e.currentTarget.style.cssText = `
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
    height:56px;
    
    font-weight: 600;
    `;
      document.getElementById("all").style.cssText = `
    color: black; 
    border-bottom: none;
    font-weight: 400;
  `;
      document.getElementById("tech").style.cssText = `
  color: black; 
  border-bottom: none;
  font-weight: 400;
`;
    }
  }
  cartOnCliCk() {
    this.setState({
      cartToggle: !this.state.cartToggle,
    });

    if (this.state.cartToggle) {
      document.getElementById("pop-up").style.display = "none";
    } else {
      document.getElementById("pop-up").style.display = "block";
    }
  }
  closePopUp(event) {
    if (this.state.cartToggle === false) {
      document.getElementById("pop-up").style.display = "none";
    }
  }

  vectorOnCliCk() {
    this.setState({
      vectorToggle: !this.state.vectorToggle,
      currencyToggle: !this.state.currencyToggle,
    });
  }

  render() {
    const {
      currencyIcon,
      setCurrencyIcon,
      setCurrency,
      cartDatatest,
    } = this.context;

    const xdAllItemsCount = cartDatatest.filter((a) => a.quantity > 0).length;
    window.localStorage.setItem("cartCount", xdAllItemsCount);
    // setCartCount(xdAllItemsCount)
    return (
      <div className="Header">
        <div className="navbar">
          <div onClick={this.categoryClick.bind(this)} id="all" className="all">
            <Link to="/">All</Link>
          </div>
          <div
            onClick={this.categoryClick.bind(this)}
            id="clothes"
            className="clothes"
          >
            <Link to="/clothes">CLOTHES</Link>
          </div>
          <div
            onClick={this.categoryClick.bind(this)}
            id="tech"
            className="tech"
          >
            <Link to="/tech">TECH</Link>
          </div>
        </div>
        <div className="logo">
          <img className="logo1" src={alogo} alt="logo"></img>
        </div>
        <div className="left-header">
          <div className="currency">
            <p className="currency-child">{currencyIcon}</p>
          </div>

          {/*curency dropdown*/}
          <div
            className="currency-drop-down-icon"
            onClick={this.vectorOnCliCk.bind(this)}
          >
            {this.state.vectorToggle ? (
              <img
                className="vector-icon"
                src={this.state.vectorDown}
                alt="logo"
              ></img>
            ) : (
              <img
                className="vector-icon"
                src={this.state.vectorUp}
                alt="logo"
              ></img>
            )}
            {this.state.currencyToggle && (
              <div
                className="currency-dropDown"
                onClick={(e) => {
                  window.localStorage.setItem(
                    "currency",
                    e.target.id.toUpperCase()
                  );

                  //console.log(e.target.id)
                  if (e.target.id === "gbp") {
                    window.localStorage.setItem("currencyIcon", "€");

                    setCurrencyIcon("€");
                    setCurrency("GBP");
                  } else if (e.target.id === "jpy") {
                    window.localStorage.setItem("currencyIcon", "¥");
                    setCurrencyIcon("¥");
                    setCurrency("JPY");
                  } else {
                    window.localStorage.setItem("currencyIcon", "$");
                    setCurrencyIcon("$");
                    setCurrency("USD");
                  }
                }}
              >
                <p className="USD" id="usd">
                  $ USD
                </p>
                <p className="EUR" id="gbp">
                  € GBP
                </p>
                <p className="JPY" id="jpy">
                  ¥ JPY
                </p>
              </div>
            )}
          </div>
          <div onClick={this.cartOnCliCk.bind(this)} className="cart">
            <img src={cart} alt="cart"></img>
          </div>
          {Boolean(xdAllItemsCount) && (
            <div className="cart-item-number">
              <p className="cart-item-number-child">{xdAllItemsCount}</p>
            </div>
          )}
        </div>

        {/*cart dropdown*/}

        {this.state.cartToggle && <HeaderCart />}
      </div>
    );
  }
}

export default Header;
