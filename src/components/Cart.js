import React from "react";
import vectorLeft from "../assets/VectorLeft.png";
import vectorRight from "../assets/VectorRight.png";
import GlobalContext from "../context/GlobalVars";
//import Header from "./Header";
class Cart extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    //this.textInput = React.createRef();
    this.state = {
      cartData: [],
      imageIndex: 0,
      sliderIndexLeft: 0,
      sliderIndexRight: 0,
      itemId: "",
      currentItemHover: "",
      currentItemHover2: "",
      currentItemHoverValue: "",
      test2: "",
    };
  }
  componentDidMount() {
    const { cartDatatest, setCurrencyToggleAndCartToggle } = this.context;
    //console.log(cartDatatest)
    this.setState({
      cartData: cartDatatest.filter((a) => a.quantity > 0),
    });
    setCurrencyToggleAndCartToggle();
    //cartDatatest.map(a=> a.other===true ? a.id=a.id+12 : a.id=a.id)
    //console.log(cartDatatest);
  }

  sliderClickRight(e) {
    this.setState({
      sliderIndexLeft: 0,
      sliderIndexRight: 1,
    });

    //console.log(x)
    this.state.cartData.some((item, index) => {
      return (
        //console.log(item)
        //console.log(item.gallery.length)
        //console.log(this.state.itemId)
        this.state.imageIndex < item.gallery.length - 1 &&
        item.id === this.state.itemId &&
        this.setState({
          imageIndex: this.state.imageIndex + 1,
          test: true,
        })
      );
    });
  }
  sliderClickLeft() {
    this.setState({
      sliderIndexLeft: 1,
      sliderIndexRight: 0,
    });
    if (this.state.imageIndex !== 0) {
      this.setState({
        imageIndex: this.state.imageIndex - 1,
      });
    }
  }

  sizeClick(e) {
    const { setSize } = this.context;

    window.localStorage.setItem("itemSize", e.currentTarget.id);
    setSize(e.currentTarget.id);

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
      return item.attributes.map((a, index) => {
        this.setState({ test2: e.currentTarget.id });
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
    });

    this.setState((prevState) => {
      localStorage.setItem("ourarraykey", JSON.stringify(prevState.cartData));
    });
    //localStorage.setItem("ourarraykey", JSON.stringify(this.state.cartData));
  }

  cartItemMouseOVer(e) {
    this.setState({
      currentItemHover: e.currentTarget.id,
      currentItemHoverValue: e.currentTarget.attributes.name.nodeValue,
    });
  }
  attributesContainerMouseOver(e) {
    this.setState({ currentItemHover2: e.currentTarget.id });
  }

  plusOnClick() {
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
    this.setState((prevState) => {
      localStorage.setItem("ourarraykey", JSON.stringify(prevState.cartData));
    });
  }

  minusOnClick() {
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
    setCartCount(this.state.cartData.length);
    this.setState((prevState) => ({
      cartData: prevState.cartData
        .map((el) => el)
        .filter((a) => a.quantity > 0),
    }));
    localStorage.setItem("ourarraykey", JSON.stringify(this.state.cartData));
  }
  imageMouseOVer(e) {
    this.setState({
      itemId: e.currentTarget.id,
    });
  }

  imageMouseLeave() {
    this.setState({
      imageIndex: 0,
    });
  }

  render() {
    const { currencyIcon, setCurrencyToggleAndCartToggle } = this.context;

    return (
      <>
        <main onClick={() => setCurrencyToggleAndCartToggle()}>
          <div className="cart-full">
            <p className="full-cart-title">Cart</p>
          </div>
          {/*  remove filter to stay items in cart with 0 quantity */}
          {this.state.cartData
            .filter((a) => a.quantity > 0)
            .map((item, index) => (
              <div
                onClick={() => setCurrencyToggleAndCartToggle()}
                className="containerindcart"
                key={index}
              >
                <div
                  key={index}
                  className="cart-content-full Cartmain"
                  id={item.id}
                  name={item.id}
                  onMouseOver={(e) => this.cartItemMouseOVer(e)}
                >
                  <div className="cart-content-left-side">
                    <p className="cart-content-item-title-full">{item.name}</p>
                    <p className="cart-content-item-title-full-2">
                      {item.brand}
                    </p>
                    <p className="cart-content-item-price-full">
                      {currencyIcon}
                      {currencyIcon === "$"
                        ? (item.prices[0].amount * item.quantity).toFixed(2)
                        : currencyIcon === "€"
                        ? (item.prices[1].amount * item.quantity).toFixed(2)
                        : currencyIcon === "¥"
                        ? (item.prices[3].amount * item.quantity).toFixed(2)
                        : currencyIcon === "A$"
                        ? (item.prices[2].amount * item.quantity).toFixed(2)
                        : currencyIcon === "₽"
                        ? (item.prices[4].amount * item.quantity).toFixed(2)
                        : null}
                    </p>

                    {item.attributes.map((a, index) => (
                      <div
                        id={a.name}
                        className="attributesContainer"
                        onMouseOver={(e) =>
                          this.attributesContainerMouseOver(e)
                        }
                      >
                        {a.items.map((i, index) => (
                          <button
                            style={
                              a.id === "Color" &&
                              a.type === "swatch" &&
                              item.color === i.id
                                ? {
                                    backgroundColor: i.value,
                                    border: "4px solid #0099CC",
                                    borderRadius: "4px",
                                  }
                                : { backgroundColor: i.value }
                            }
                            onClick={(e) => this.sizeClick(e)}
                            className={
                              (item.size === i.id || item.capacity === i.id) &&
                              a.type === "text"
                                ? "cart-content-item-size-one-full cartActive"
                                : a.id === "Color" &&
                                  a.type === "swatch" &&
                                  item.color === i.id
                                ? "cart-content-item-size-one-full cartActiveColor"
                                : a.id === "Touch ID in keyboard" &&
                                  a.type === "text" &&
                                  item.touchIdInKeyboard === i.id
                                ? "cart-content-item-size-one-full cartActive2"
                                : a.id === "With USB 3 ports" &&
                                  a.type === "text" &&
                                  item.withUsb3Ports === i.id
                                ? "cart-content-item-size-one-full cartActive2"
                                : a.type === "text"
                                ? "cart-content-item-size-one-full cartActive4"
                                : "cart-content-item-size-one-full cartActive4"
                            }
                            id={i.id + item.id + a.id}
                            value={i.displayValue}
                            name={i.id}
                            ref={this.myRef}
                          >
                            {a.type === "text" && i.value}
                          </button>
                        ))}
                        {item.attributes.length > 2 && a.id}
                      </div>
                    ))}
                  </div>

                  <div id="cart-count-full">
                    <p
                      onClick={() => this.plusOnClick()}
                      className="cart-content-item-count-plus-full"
                    >
                      +
                    </p>
                    <p className="cart-content-item-cout-opacity cart-content-item-cout-opacity-full">
                      {item.quantity}
                    </p>
                    <p
                      onClick={() => this.minusOnClick()}
                      className="cart-content-item-count-minus-full"
                    >
                      -
                    </p>
                  </div>

                  <div
                    className="cart-content-right-side-full"
                    onMouseLeave={() => this.imageMouseLeave()}
                  >
                    <img
                      className="cart-content-right-sid-image-full"
                      src={
                        item.gallery[
                          item.id !== this.state.itemId
                            ? 0
                            : this.state.imageIndex
                        ]
                      }
                      id={item.id}
                      onMouseOver={(e) => this.imageMouseOVer(e)}
                      alt="cart"
                    ></img>

                    <div className="cart-arrows">
                      {item.gallery.length > 1 && (
                        <>
                          <img
                            className="cart-image-vectorLeft"
                            src={vectorLeft}
                            onClick={this.sliderClickLeft.bind(this)}
                            alt="cart"
                          ></img>
                          <img
                            className="cart-image-vectorRight"
                            src={vectorRight}
                            onClick={this.sliderClickRight.bind(this)}
                            alt="cart"
                          ></img>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div
            id="pop-up"
            onClick={() => setCurrencyToggleAndCartToggle()}
          ></div>
        </main>
      </>
    );
  }
}

export default Cart;
