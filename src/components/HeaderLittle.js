import React from "react";
import { Link } from "react-router-dom";
import alogo from "../assets/alogo.png";
import vectorUp from "../assets/VectorUp.png";
import vectorDown from "../assets/Vector.png";
import cart from "../assets/cart.png";
import GlobalContext from "../context/GlobalVars";
import HeaderCart from "../components/HeaderCart";
import All from "./All";

//import Item from "./Item";
import react from "react";
//import Cart from "./Cart";
//import {useNavigate} from 'react-router-dom';
class HeaderLittle extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.category = react.createRef();
    this.category2 = react.createRef();
    this.category3 = react.createRef();

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
      content: <All />,
      mounted: false,
    };
    //this.closePopUp = this.closePopUp.bind(this);
  }

  componentDidMount() {
    var category = sessionStorage.getItem('category') || localStorage.getItem("category")
    //console.log("mount header");
    this.setState({ mounted: true });

    if (category === "tech") {
      this.category3.current.className = "tech headerActive";
    } else if (category === "clothes") {
      this.category2.current.className = "clothes headerActive";
    } else {
      this.category.current.className = "all headerActive";
    }
  }

  /*
  itemClick = () => {
    const x = localStorage.getItem("category");
     if(x==='item'){
      this.setState({content:<Item itemClick={this.itemClick}/>})
    }else if(x==='cart'  && this.state.mounted){
      this.setState({content:<Cart itemClick={this.itemClick}/>})
    }else{
      this.setState({content:<All/>})
    }
  }

  */

  categoryClick(e) {
    const { setCurrencyToggleAndCartToggle } = this.context;
    setCurrencyToggleAndCartToggle();
    //console.log(e.currentTarget.id);
    //const data = ["tech", "all", "clothes"];
    localStorage.setItem("category", e.currentTarget.id);
    sessionStorage.setItem("category", e.currentTarget.id);
    const x = localStorage.getItem("category");
    if (x === "tech" && this.category3.current.id === "tech") {
      return (
        (this.category3.current.className = "tech headerActive"),
        (this.category2.current.className = "clothes"),
        (this.category.current.className = "all")
        
      );
    } else if (x === "clothes" && this.category2.current.id === "clothes") {
      return (
        (this.category2.current.className = "clothes headerActive"),
        (this.category.current.className = "all"),
        (this.category3.current.className = "tech")
      );
    } else {
      return (
        (this.category.current.className = "all headerActive"),
        (this.category3.current.className = "tech"),
        (this.category2.current.className = "clothes")
      );
    }
  }
  cartOnCliCk() {
    const { setCartToggle, cartToggle } = this.context;
    const popUpStyle = this.myRef.current;
    setCartToggle();
    if (cartToggle) {
      popUpStyle.style.display = "none";
    } else {
      popUpStyle.style.display = "block";
      popUpStyle.style.zIndex = 1;
    }
  }
  /*
  closePopUp(event) {
    const { cartToggle } = this.context;
    if (cartToggle === false) {
      document.getElementById("pop-up").style.display = "none";
    }
  }

  */

  vectorOnCliCk() {
    const { setCurrencyToggle } = this.context;
    const popUpStyle = this.myRef.current;
    setCurrencyToggle();
    popUpStyle.style.display = "none";
  }
  currencyClick(e) {
    const { setCurrencyIcon, setCurrency } = this.context;
    window.localStorage.setItem("currency", e.target.id.toUpperCase());

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
        <div className="Header">
          <div className="navbar">
            <Link to="/">
              <div
                onClick={this.categoryClick.bind(this)}
                id="all"
                className="all"
                ref={this.category}
              >
                ALL
              </div>
            </Link>
            <Link to="/clothes">
              <div
                onClick={this.categoryClick.bind(this)}
                id="clothes"
                className="clothes"
                ref={this.category2}
              >
                CLOTHES
              </div>
            </Link>
            <Link to="/tech">
              <div
                onClick={this.categoryClick.bind(this)}
                id="tech"
                className="tech"
                ref={this.category3}
              >
                TECH
              </div>
            </Link>
          </div>

          <div
            className="logo"
            onClick={() => setCurrencyToggleAndCartToggle()}
          >
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
                  onClick={(e) => this.currencyClick(e)}
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

          {cartToggle && (
            <HeaderCart
              content={this.state.content}
              itemClick={this.itemClick}
            />
          )}
          <div
            id="pop-up"
            onClick={() => setCurrencyToggleAndCartToggle()}
            ref={this.myRef}
          ></div>
        </div>
      </>
    );
  }
}

export default HeaderLittle;
