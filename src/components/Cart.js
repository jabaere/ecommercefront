import React from "react";
import vectorLeft from "../assets/VectorLeft.png";
import vectorRight from "../assets/VectorRight.png";
import GlobalContext from "../context/GlobalVars";

class Cart extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
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
    };
  }
  componentDidMount() {
    const { cartDatatest } = this.context;
    //console.log(cartDatatest)
    this.setState({
      cartData: cartDatatest.filter((a) => a.quantity > 0),
    });
    //cartDatatest.map(a=> a.other===true ? a.id=a.id+12 : a.id=a.id)
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
      item.attributes.map((a, index) => {
       
        document.getElementById(a.id).style.cssText = `
        display: flex; 
        justify-content: start;
        margin-bottom: 15px;
        `;

        if (
          a.id === this.state.currentItemHover2 &&
          item.id === this.state.currentItemHover &&
          a.type === "text" &&
          item.id === this.state.currentItemHoverValue
        ) {
          document.getElementById(e.currentTarget.id).style.cssText = `
          background-color: #1D1F22;
          color:white;
         
          `;
        }

        if (
          a.id === this.state.currentItemHover2 &&
          item.id === this.state.currentItemHover &&
          a.type === "swatch" &&
          item.id === this.state.currentItemHoverValue
        ) {
          document.getElementById(e.currentTarget.id).style.cssText = `
            background-color: ${e.currentTarget.value};
            border: 4px solid #0099CC;
            border-radius: 4px
            `;
        }

        a.items.map((i) => {
          if (
            i.id + item.id !== e.currentTarget.id &&
            a.id === this.state.currentItemHover2 &&
            item.id === this.state.currentItemHover &&
            a.id === "Size"
          ) {
            item.size = e.currentTarget.value;
          } else if (
            this.state.currentItemHover2 === "Color" &&
            i.id + item.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            item.color = e.currentTarget.value;
          } else if (
            this.state.currentItemHover2 === "Capacity" &&
            i.id + item.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            item.capacity = e.currentTarget.value;
          }
          if (
            i.id + item.id !== e.currentTarget.id &&
            a.id === this.state.currentItemHover2 &&
            item.id === this.state.currentItemHover &&
            a.id !== "Color"
          ) {
            item.attributes.length > 1 &&
              this.setState({ capacity: e.currentTarget.id });
            document.getElementById(i.id + item.id).style.cssText = `
            background-color: white;
            color:#1D1F22;
            
            `;
          } else if (
            this.state.currentItemHover2 === "Color" &&
            i.id + item.id !== e.currentTarget.id &&
            item.id === this.state.currentItemHover &&
            a.id === this.state.currentItemHover2
          ) {
            document.getElementById(i.id + item.id).style.cssText = `
            background-color: ${i.id};
            
            `;
          }
        });
      });
    });
    localStorage.setItem("ourarraykey", JSON.stringify(this.state.cartData));
  }

  render() {
    const { currencyIcon, setCartCount } = this.context;
    return (
      <main>
        <div className="cart-full">
          <p className="full-cart-title">Cart</p>
        </div>
        {/*  remove filter to stay items in cart with 0 quantity */}
        {this.state.cartData
          .filter((a) => a.quantity > 0)
          .map((item, index) => (
            <div
              key={index}
              className="cart-content-full"
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
                <p className="cart-content-item-title-full">{item.name}</p>
                <p className="cart-content-item-title-full-2">{item.brand}</p>
                <p className="cart-content-item-price-full">
                  {currencyIcon}
                  {currencyIcon === "$"
                    ? (item.prices[0].amount * item.quantity).toFixed(2)
                    : currencyIcon === "€"
                    ? (item.prices[1].amount * item.quantity).toFixed(2)
                    : currencyIcon === "¥"
                    ? (item.prices[3].amount * item.quantity).toFixed(2)
                    : null}
                </p>

                {item.attributes.map((a, index) => (
                  <div
                    id={a.name}
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginBottom: "15px",
                    }}
                    onMouseOver={(e) =>
                      this.setState({ currentItemHover2: e.currentTarget.id })
                    }
                  >
                    {a.items
                      .filter(
                        (g) =>
                          g.displayValue !== "Yes" && g.displayValue !== "No"
                      )
                      .map((i, index) => (
                        <button
                          style={
                            (item.size === i.id || item.capacity === i.id) &&
                            a.type === "text"
                              ? { backgroundColor: "#1D1F22", color: "white" }
                              : a.id === "Color" &&
                                a.type === "swatch" &&
                                item.color === i.id
                              ? {
                                  backgroundColor: i.value,
                                  border: "4px solid #0099CC",
                                  borderRadius: "4px",
                                }
                              : a.type === "text" ? {backgroundColor: "white"}
                              : { backgroundColor: i.value }
                          }
                          onClick={(e) => this.sizeClick(e)}
                          className="cart-content-item-size-one-full"
                          id={i.id + item.id}
                          value={i.displayValue}
                          name={i.id}
                        >
                          {a.type === "text" && i.value}
                        </button>
                      ))}
                  </div>
                ))}
              </div>

              <div
                id="cart-count-full"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  marginLeft: "auto",
                  marginRight: "8px",
                }}
              >
                <p
                  onClick={() => {
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
                      cartData: prevState.cartData.map((el) => el),
                    }));
                  }}
                  className="cart-content-item-count-plus-full"
                >
                  +
                </p>
                <p className="cart-content-item-cout-opacity cart-content-item-cout-opacity-full">
                  {item.quantity}
                </p>
                <p
                  onClick={() => {
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
                    setCartCount(this.state.cartData.length);
                    this.setState((prevState) => ({
                      cartData: prevState.cartData
                        .map((el) => el)
                        .filter((a) => a.quantity > 0),
                    }));
                    localStorage.setItem(
                      "ourarraykey",
                      JSON.stringify(this.state.cartData)
                    );
                  }}
                  className="cart-content-item-count-minus-full"
                >
                  -
                </p>
              </div>

              <div
                className="cart-content-right-side-full"
                onMouseLeave={(e) => {
                  this.setState({
                    imageIndex: 0,
                  });
                }}
              >
                <img
                  className="cart-content-right-sid-image-full"
                  src={
                    item.gallery[
                      item.id !== this.state.itemId ? 0 : this.state.imageIndex
                    ]
                  }
                  id={item.id}
                  onMouseOver={(e) =>
                    this.setState({
                      itemId: e.currentTarget.id,
                    })
                  }
                  alt="cart"
                ></img>

                <div className="cart-arrows">
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
                </div>
              </div>
            </div>
          ))}
        <div id="pop-up"></div>
      </main>
    );
  }
}

export default Cart;
