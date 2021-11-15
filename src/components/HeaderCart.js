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
    this.closePopUp = this.closePopUp.bind(this);
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

  sizeClick(e) {
    const { setSize } = this.context;
    window.localStorage.setItem("itemSize", e.currentTarget.id);
    setSize(e.currentTarget.id);
    //console.log(this.state.currentItemHover2);
    //console.log(e.currentTarget.id);
    this.state.cartData.map((item) => {
      //item.size = e.currentTarget.id
      //item.clothesSize = e.currentTarget.value
      return item.attributes.map((k) => {
        if (this.state.currentItemHoverValue === item.id && k.id === "Color") {
          return this.setState({
            color: e.currentTarget.value,
          });
        } else if (
          this.state.currentItemHoverValue === item.id &&
          k.id === "Capacity"
        ) {
          return (
            this.setState({
              capacity: e.currentTarget.value,
              size: "",
            }),
            (item.capacity = e.currentTarget.value)
          );
        } else if (
          this.state.currentItemHoverValue === item.id &&
          k.id === "Size"
        ) {
          return (
            this.setState({
              color: "",
              size: e.currentTarget.value,
              capacity: "",
            }),
            (item.size = e.currentTarget.value),
            (item.clothesSize = "")
          );
        } else {
          return null;
        }
      });
    });
    localStorage.setItem("ourarraykey", JSON.stringify(this.state.cartData));
  }

  render() {
    const {
      currencyIcon,
      individualItemsQuantity,
      cartDatatest,
      setCartCount,
      currency,
    } = this.context;
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
            className="cart-dropDown"
            style={
              this.state.cartData.length <= 1
                ? { height: "auto" }
                : { height: "540px" }
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
                    onMouseOver={(e) =>
                      this.setState({
                        currentItemHover: e.currentTarget.id,
                        currentItemHoverValue:
                          e.currentTarget.attributes.name.nodeValue,
                      })
                    }
                  >
                    <div className="cart-content-left-side">
                      <p
                        style={{ whiteSpace: "pre-wrap" }}
                        className="cart-content-item-title"
                      >
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
                            onMouseOver={(e) =>
                              this.setState({
                                currentItemHover2: e.currentTarget.id,
                              })
                            }
                          >
                            {a.items
                              .filter(
                                (g) =>
                                  g.displayValue !== "Yes" &&
                                  g.displayValue !== "No"
                              )
                              .map((i, index) => {
                                return (
                                  a.type === "text" /*whow all attributes*/ && (
                                    <button
                                      style={
                                        item.size === i.id ||
                                        item.capacity === i.id
                                          ? {
                                              backgroundColor: "#1D1F22",
                                              color: "white",
                                            }
                                          : { backgroundColor: "white" }
                                      }
                                      id={i.id + item.id}
                                      className="cart-content-item-size-one"
                                      onClick={(e) => this.sizeClick(e)}
                                      value={i.id}
                                      type="submit"
                                      ref={this.myRef}
                                    >
                                      {a.type === "text" && (
                                        <span style={{ fontSize: "10px" }}>
                                          {i.value}
                                        </span>
                                      )}
                                    </button>
                                  )
                                );
                              })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="cart-count">
                      <p
                        className="cart-content-item-count-plus"
                        onClick={(e) => {
                          window.localStorage.setItem(
                            "individualItemsQuantity",
                            individualItemsQuantity + 1
                          );
                          //console.log(this.state.currentItemHoverValue)
                          //console.log(e.currentTarget.value);
                          setCartCount(this.state.cartData.length);
                          this.state.cartData.map(
                            (a, index) =>
                              a.id === this.state.currentItemHover &&
                              this.state.currentItemHoverValue === item.id && {
                                name: item.name,
                                id: item.id,
                                brand: item.brand,
                                prices: item.prices,
                                gallery: item.gallery,
                                description: item.description,
                                attributes: item.attributes,
                                quantity: (a.quantity += 1),
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
                            localStorage.setItem(
                              "ourarraykey",
                              JSON.stringify(prevState.cartData)
                            );
                          });
                        }}
                      >
                        +
                      </p>
                      <p className="cart-content-item-cout-opacity">
                        {item.quantity}
                      </p>
                      <p
                        className="cart-content-item-count-minus"
                        onClick={(e) => {
                          this.state.cartData.map(
                            (a, index) =>
                              a.id === this.state.currentItemHover &&
                              this.state.currentItemHoverValue === item.id && {
                                name: item.name,
                                id: item.id,
                                brand: item.brand,
                                prices: item.prices,
                                gallery: item.gallery,
                                description: item.description,
                                attributes: item.attributes,
                                quantity: (a.quantity -= 1),
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
                            localStorage.setItem(
                              "ourarraykey",
                              JSON.stringify(prevState.cartData)
                            );
                          });

                          //console.log(this.state.cartData);
                          setCartCount(this.state.cartData.length);
                        }}
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
                      onClick={() =>
                        this.setState({
                          cartToggle: false,
                        })
                      }
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
