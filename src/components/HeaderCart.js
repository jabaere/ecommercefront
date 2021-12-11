import React from "react";
import { Link } from "react-router-dom";
import vectorUp from "../assets/VectorUp.png";
import vectorDown from "../assets/Vector.png";
import GlobalContext from "../context/GlobalVars";

class HeaderCart extends React.Component {
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
      font: "",
      selected: false,
      quantitty: 0,
      currentItemHover: "",
      currentItemHover2: "",
      currentItemHoverValue: "",
      sum: 0,
    };
  }

  componentDidMount() {
    const { cartDatatest } = this.context;

    this.setState({
      cartData: cartDatatest.filter((a) => a.quantity > 0),
      data: [],
    });
    console.log(cartDatatest.filter((a) => a.quantity > 0));

    cartDatatest.map((item) => {
      //console.log(item.quantity)
      // this.setState({quantitty:item.quantity})
      return item.attributes.map((a) =>
        a.items.map((i) => {
          // console.log(i)
          //console.log(item.select)
          return i.id === item.select && this.setState({ selected: true });
        })
      );
    });

    this.setState({
      cartToggle: !this.state.cartToggle,
    });

    /* if (this.state.cartToggle) {
      document.getElementById("pop-up").style.display = "none";
    } else {
      document.getElementById("pop-up").style.display = "block";
    }
    */
  }

  vectorOnCliCk() {
    this.setState({
      vectorToggle: !this.state.vectorToggle,
      currencyToggle: !this.state.currencyToggle,
    });
  }

  sizeClick(e) {
    const { setSize } = this.context;
    window.localStorage.setItem("itemSize", e.currentTarget.id);
    setSize(e.currentTarget.id);

    //console.log(this.state.currentItemHover2);
    //console.log(e.currentTarget.id);
    this.state.cartData.map((item) => {
      if (item.attributes.length > 1) {
        this.setState({
          color: e.currentTarget.value,
        });
      } else {
        this.setState({
          color: "",
          size: e.currentTarget.value,
          capacity: "",
        });
      }
      //item.size = e.currentTarget.id
      //item.clothesSize = e.currentTarget.value
      item.attributes.map((a, index) => {
        //console.log(e.currentTarget.id);
        //console.log(this.state.currentItemHoverValue)
        //console.log(this.state.currentItemHover2)
        return a.items.map((i) => {
          if (
            i.id + item.id + a.id !== e.currentTarget.id &&
            a.id === this.state.currentItemHover2 &&
            item.id === this.state.currentItemHover &&
            a.id === "Size"
          ) {
            return (
              (item.size = e.currentTarget.value),
              (item.withUsb3Ports = ""),
              (item.touchIdInKeyboard = "")
            );
          } else if (
            this.state.currentItemHover2 === "Color" &&
            i.id + item.id + a.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            return (item.color = e.currentTarget.value);
          } else if (
            this.state.currentItemHover2 === "Capacity" &&
            i.id + item.id + a.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            return (item.capacity = e.currentTarget.value);
          } else if (
            this.state.currentItemHover2 === "With USB 3 ports" &&
            i.id + item.id + a.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            return (item.withUsb3Ports = e.currentTarget.value);
          } else if (
            this.state.currentItemHover2 === "Touch ID in keyboard" &&
            i.id + item.id + a.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            return (item.touchIdInKeyboard = e.currentTarget.value);
          } else {
            return null;
          }

          //console.log(this.state.test2===i.id + item.id + a.id)
          //console.log(this.state.test2)
          //console.log(i.id + item.id + a.id)
        });
      });
      return localStorage.setItem(
        "ourarraykey",
        JSON.stringify(this.state.cartData)
      );
    });
  }
  attributesContainerMouseOver(e) {
    this.setState({ currentItemHover2: e.currentTarget.id });
  }

  minusClick() {
    const { setCartCount } = this.context;

    this.state.cartData.map(
      (item, index) =>
        item.id === this.state.currentItemHover &&
        this.state.currentItemHoverValue === item.id && {
          name: item.name,
          id: item.id,
          brand: item.brand,
          prices: item.prices,
          gallery: item.gallery,
          description: item.description,
          attributes: item.attributes,
          quantity: (item.quantity -= 1),
          deleted: false,
        }
      // const jsonQuant = JSON.stringify(quant);
      // console.log(a.id === this.state.currentItemHover )
    );

    this.setState((prevState) => ({
      cartData: prevState.cartData
        .map((el) => el)
        .filter((a) => a.quantity > 0),
    }));

    this.setState((prevState) => {
      localStorage.setItem("ourarraykey", JSON.stringify(prevState.cartData));
    });

    //console.log(this.state.cartData);
    setCartCount(this.state.cartData.length);
  }

  plusClick() {
    const { individualItemsQuantity, setCartCount } = this.context;

    window.localStorage.setItem(
      "individualItemsQuantity",
      individualItemsQuantity + 1
    );
    //console.log(this.state.currentItemHoverValue)
    //console.log(e.currentTarget.value);
    setCartCount(this.state.cartData.length);
    this.state.cartData.map(
      (item, index) =>
        item.id === this.state.currentItemHover &&
        this.state.currentItemHoverValue === item.id && {
          name: item.name,
          id: item.id,
          brand: item.brand,
          prices: item.prices,
          gallery: item.gallery,
          description: item.description,
          attributes: item.attributes,
          quantity: (item.quantity += 1),
          deleted: false,
        }
      // const jsonQuant = JSON.stringify(quant);
      // console.log(a.id === this.state.currentItemHover )
    );
    this.setState((prevState) => ({
      cartData: prevState.cartData
        .map((el) => el)
        .filter((a) => a.quantity > 0),
    }));

    this.setState((prevState) => {
      localStorage.setItem("ourarraykey", JSON.stringify(prevState.cartData));
    });
  }
  itemMouseOver(e) {
    this.setState({
      currentItemHover: e.currentTarget.id,
      currentItemHoverValue: e.currentTarget.attributes.name.nodeValue,
    });
  }
  itemSizeMouseOVer(e) {
    this.setState({
      currentItemHover2: e.currentTarget.id,
    });
  }

  cartToggle = () => {
    //localStorage.setItem("category", 'cart');
    //localStorage.setItem("category", 'cart');
    //this.props.itemClick()
    this.setState({
      cartToggle: false,
    });
  };

  render() {
    const { currencyIcon, cartDatatest, currency } = this.context;

    const xdAllItemsCount = cartDatatest.filter((a) => a.quantity > 0).length;
    const itemIndividualCountFor = cartDatatest.reduce(
      (total, item) => item.quantity + total,
      0
    );
    const itemIndividualCountFor2 = itemIndividualCountFor - xdAllItemsCount;
    const sum = cartDatatest
      .filter((a) => a.quantity > 0)
      .map((el) => {
        //console.log(el);

        return el.prices
          .filter((ops) => ops.currency === currency)
          .map((a) => {
            return a.amount * el.quantity;
          });
      })
      .reduce((a, b) => {
        //console.log(b);
        const sum = b.concat(a);

        return sum.reduce((j, k) => Number(j + k));
      }, null);

    // const savedCart = JSON.parse(selectedItem);
    return (
      <div className="Header">
        {/*cart dropdown*/}
        {this.state.cartToggle && (
          <div
            className={
              this.state.cartData.length <= 1
                ? "cart-dropDown cart-dropDown-height1"
                : "cart-dropDown cart-dropDown-height2"
            }
          >
            <div className="cart-title">
              <b>My bag,</b>{" "}
              {Number(itemIndividualCountFor2) + this.state.cartData.length}{" "}
              items
            </div>
            {Boolean(this.state.cartData.length) &&
              this.state.cartData.map((item, index) => (
                <div>
                  <div
                    className="cart-content"
                    id={item.id}
                    name={item.id}
                    onMouseOver={(e) => this.itemMouseOver(e)}
                  >
                    <div className="cart-content-left-side">
                      <p className="cart-content-item-title cartContentTitle">
                        {item.name} {"\n"}
                        {item.brand}
                      </p>
                      <p className="cart-content-item-price">
                        {currencyIcon}
                        {currencyIcon === "$"
                          ? item.prices[0]
                              .amount /* * item.quantity).toFixed(2) */
                          : currencyIcon === "€"
                          ? item.prices[1]
                              .amount /*  * item.quantity).toFixed(2) */
                          : currencyIcon === "¥"
                          ? item.prices[3]
                              .amount /*  * item.quantity).toFixed(2)*/
                          : currencyIcon === "A$"
                          ? item.prices[2]
                              .amount /* * item.quantity).toFixed(2)*/
                          : currencyIcon === "₽"
                          ? item.prices[4]
                              .amount /* * item.quantity).toFixed(2)*/
                          : null}
                      </p>

                      <div id="cart-size">
                        {item.attributes.map((a, index) => (
                          <div
                            className="item-size-container2"
                            id={a.id}
                            onMouseOver={(e) => this.itemSizeMouseOVer(e)}
                          >
                            <div className="other3">
                              {item.attributes.length > 2 && a.id}
                            </div>
                            {a.items.map((i, index) => {
                              return (
                                <button
                                  id={i.id + item.id + a.id}
                                  style={
                                    a.id === "Color" &&
                                    a.type === "swatch" &&
                                    item.color === i.id
                                      ? {
                                          backgroundColor: i.value,
                                          border: "4px solid #0099CC",
                                          borderRadius: "4px",
                                          height: "14px",
                                          width: "20px",
                                        }
                                      : { backgroundColor: i.value }
                                  }
                                  className={
                                    (item.size === i.id ||
                                      item.capacity === i.id) &&
                                    a.type === "text"
                                      ? "cart-content-item-size-one cartActive"
                                      : a.id === "Color" &&
                                        a.type === "swatch" &&
                                        item.color === i.id
                                      ? "cart-content-item-size-one cartActiveColor colorButtons"
                                      : a.id === "Touch ID in keyboard" &&
                                        a.type === "text" &&
                                        item.touchIdInKeyboard === i.id
                                      ? "cart-content-item-size-one cartActive2"
                                      : a.id === "With USB 3 ports" &&
                                        a.type === "text" &&
                                        item.withUsb3Ports === i.id
                                      ? "cart-content-item-size-one cartActive2"
                                      : a.type === "text"
                                      ? "cart-content-item-size-one cartActive4"
                                      : "cart-content-item-size-one cartActive4 colorButtons"
                                  }
                                  onClick={(e) => this.sizeClick(e)}
                                  value={i.id}
                                  type="submit"
                                  ref={this.myRef}
                                >
                                  {a.type === "text" && (
                                    <span className="valueFont">{i.value}</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="cart-count">
                      <p
                        className="cart-content-item-count-plus"
                        onClick={() => this.plusClick()}
                      >
                        +
                      </p>
                      <p className="cart-content-item-cout-opacity">
                        {item.quantity}
                      </p>
                      <p
                        className="cart-content-item-count-minus"
                        onClick={() => this.minusClick()}
                      >
                        -
                      </p>
                    </div>

                    <div className="cart-content-right-side">
                      <img src={item.gallery[0]} alt="itemimage"></img>
                    </div>
                  </div>
                </div>
              ))}
            {Boolean(this.state.cartData.length) && (
              <>
                {/*console.log(this.state.cartData.length)*/}
                <div className="cart-total">
                  <p className="cart-total-total">Total</p>

                  {
                    <p className="cart-total-price">
                      {currencyIcon}
                      {Number(sum).toFixed(2)}
                    </p>
                  }
                </div>

                <div className="cart-buttons">
                  <Link to="/cart">
                    <button
                      onClick={() => this.cartToggle()}
                      className="cart-buttons-left"
                    >
                      {" "}
                      <span className="cart-buttons-left-text">view bag</span>
                    </button>
                  </Link>
                  <button className="cart-buttons-right">
                    <span className="cart-buttons-right-text">check out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default HeaderCart;
