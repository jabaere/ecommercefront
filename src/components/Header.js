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
    this.myRef = React.createRef();
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

  componentDidMount(){
   
    const data = ["tech","all","clothes"]
   
    const x = localStorage.getItem("category")
    data.map(a=>  a === x  ? 
    
      document.getElementById(x).style.cssText = `
      color: #5ECE7B;
      border-bottom: 2px solid #5ECE7B;
      height:56px;
     
      font-weight: 600;
      `
      :
      document.getElementById(a).style.cssText = `
      color: black;
      border:none;
      font-weight: 400;
      `     
    )
  }

  categoryClick(e) {
    //console.log(e.currentTarget.id);
    const data = ["tech", "all", "clothes"];
    localStorage.setItem("category", e.currentTarget.id);
    const x = localStorage.getItem("category");
    data.map(a=>  a === x  ? 
    
      document.getElementById(x).style.cssText = `
      color: #5ECE7B;
      border-bottom: 2px solid #5ECE7B;
      height:56px;
     
      font-weight: 600;
      `
      :
      document.getElementById(a).style.cssText = `
      color: black;
      border:none;
      font-weight: 400;
      `     
    )
    
  }
  cartOnCliCk() {
    const { setCartToggle, cartToggle } = this.context;
    setCartToggle();
    if (cartToggle) {
      document.getElementById("pop-up").style.display = "none";
    } else {
      document.getElementById("pop-up").style.display = "block";
    }
  }
  closePopUp(event) {
    const { cartToggle } = this.context;
    if (cartToggle === false) {
      document.getElementById("pop-up").style.display = "none";
    }
  }

  vectorOnCliCk() {
    const { setCurrencyToggle } = this.context;

    setCurrencyToggle();
    document.getElementById("pop-up").style.display = "none";
  }

  render() {
    const {
      currencyIcon,
      setCurrencyIcon,
      setCurrency,
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
      <div className="Header">
        <div className="navbar">
          <div
            onClick={this.categoryClick.bind(this)}
            id="all"
            className='all'
            ref={this.myRef}
          >
            <Link to="/">All</Link>
          </div>
          <div
            onClick={this.categoryClick.bind(this)}
            id="clothes"
            className="clothes"
            ref={this.myRef}
          >
            <Link to="/clothes">CLOTHES</Link>
          </div>
          <div
            onClick={this.categoryClick.bind(this)}
            id="tech"
            className="tech"
            ref={this.myRef}
          >
            <Link to="/tech">TECH</Link>
          </div>
        </div>
        <div className="logo" onClick={() => setCurrencyToggleAndCartToggle()}>
          <img className="logo1" src={alogo} alt="logo"></img>
        </div>
        <div className="left-header">
          <div className="currency">
            <p
              className="currency-child"
              onClick={this.vectorOnCliCk.bind(this)}
            >
              {currencyIcon}
            </p>
          </div>

          {/*curency dropdown*/}
          <div
            className="currency-drop-down-icon"
            onClick={this.vectorOnCliCk.bind(this)}
          >
            {vectorToggle ? (
              <img
                className="vector-icon"
                src={this.state.vectorUp}
                alt="logo"
              ></img>
            ) : (
              <img
                className="vector-icon"
                src={this.state.vectorDown}
                alt="logo"
              ></img>
            )}
            {currencyToggle && (
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
                  } else if (e.target.id === "aud") {
                    window.localStorage.setItem("currencyIcon", "A$");
                    setCurrencyIcon("A$");
                    setCurrency("AUD");
                  } else if (e.target.id === "rub") {
                    window.localStorage.setItem("currencyIcon", "₽");
                    setCurrencyIcon("₽");
                    setCurrency("RUB");
                  } else {
                    window.localStorage.setItem("currencyIcon", "$");
                    setCurrencyIcon("$");
                    setCurrency("USD");
                  }
                }}
              >
                <p className="JPY" id="usd">
                  $ USD
                </p>
                <p className="JPY" id="gbp">
                  € GBP
                </p>
                <p className="JPY" id="jpy">
                  ¥ JPY
                </p>
                <p className="JPY" id="aud">
                  A$ AUD
                </p>
                <p className="JPY" id="rub">
                  ₽ RUB
                </p>
              </div>
            )}
          </div>
          <div onClick={this.cartOnCliCk.bind(this)} className="cart">
            <img src={cart} alt="cart"></img>
          </div>
          {Boolean(xdAllItemsCount) && (
            <div
              className="cart-item-number"
              onClick={this.cartOnCliCk.bind(this)}
            >
              <p className="cart-item-number-child">
                {xdAllItemsCount + itemIndividualCountFor2}
              </p>
            </div>
          )}
        </div>

        {/*cart dropdown*/}

        {cartToggle && <HeaderCart />}
      </div>
    );
  }
}

export default Header;
