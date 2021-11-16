import React from "react";
import GlobalContext from "../context/GlobalVars";
import Header from "./Header";
import { Markup } from "interweave";
class Item extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
      imageIndex: 0,
      selected: false,
      capacity: 0,
      outOfStock: true,
      color: "",
      currentItemHover: "",
      size: "",
      liked: false,
      clothesSize: "",
      currentItemHover2: "",
      touchIdInKeyboard: "",
      withUsb3Ports: "",
    };
  }

  componentDidMount() {
    const { addedItemsId } = this.context;

    //console.log(addedItemsId);

    const query = `
    query ($id:String!) {
      product (id:$id) {
      id
      name
      inStock
      gallery
      description
      category
        attributes{
          id
          name
          type
          items{
             displayValue
             value
             id
          }
        }
        prices{
           currency
           amount
      }
      brand
      }
    }  
      `;

    const url = "http://localhost:4000/graphql";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { id: addedItemsId },
      }),
    };
    fetch(url, opts)
      .then((res) => res.json())
      .then(({ data }) => {
        //console.log(data);
        const x = [];

        x.push(data.product);
        this.setState({ data: x });

        console.log(data);
      })
      .catch(console.error);
    //console.log(this.state.data);
  }

  handleClick(event) {
    this.setState({ liked: !this.state.liked });
  }

  sizeClick(e) {
    const { setSize, setCapacity } = this.context;
    window.localStorage.setItem("itemSize", this.state.size);
    window.localStorage.setItem("itemCapacity", this.state.capacity);
    window.localStorage.setItem("clothesSize", this.state.clothesSize);
    setCapacity(this.state.capacity);
    setSize(this.state.size);
    
    //console.log(e.currentTarget.value);
    //console.log(e.currentTarget.name)
    //console.log(e.currentTarget.id)
    this.state.data.map((item) => {
      return (
        item.attributes.map((k) => {
          if (this.state.currentItemHover === k.id && k.id === "Color") {
            return this.setState({
              color: e.currentTarget.value,
            });
          } else if (
            this.state.currentItemHover === k.id &&
            k.id === "Touch ID in keyboard"
          ) {
            return this.setState({
              touchIdInKeyboard: e.currentTarget.value,
              color: "",
              size: "",
            });
          } else if (
            this.state.currentItemHover === k.id &&
            k.id === "With USB 3 ports"
          ) {
            return this.setState({
              withUsb3Ports: e.currentTarget.value,
              color: "",
              size: "",
            });
          } else if (
            this.state.currentItemHover === k.id &&
            k.id === "Capacity"
          ) {
            return this.setState({
              capacity: e.currentTarget.value,
              size: "",
            });
          } else if (this.state.currentItemHover === k.id && k.id === "Size") {
            return this.setState({
              color: "",
              size: e.currentTarget.value,
              capacity: "",
              clothesSize: e.currentTarget.value,
            });
          } else {
            return null;
          }
        }),
        item.attributes.map((a) => {
          //console.log(this.myRef.current);
          //console.log(this.state.currentItemHover);

          if (a.id === this.state.currentItemHover && a.type === "text") {
            document.getElementById(e.currentTarget.id).style.cssText = `
            background-color: #1D1F22;
            color:white;
            `;
            // document.getElementById(a.id).firstElementChild.firstChild.style.backgroundColor='green'
          }

          if (a.id === this.state.currentItemHover && a.type !== "text") {
            document.getElementById(e.currentTarget.id).style.cssText = `
            background-color: ${e.currentTarget.value};
            border: 4px solid #0099CC;
            border-radius: 4px
            `;
          }

          // console.log(Object.keys(a))
          return a.items.map((i, index) => {
            if (
              i.id + a.name !== e.currentTarget.id &&
              a.id === this.state.currentItemHover &&
              this.state.currentItemHover !== "Color"
            ) {
              return (document.getElementById(i.id + a.name).style.cssText = `
            background-color: white;
            color:#1D1F22;
            `);
            } else if (
              this.state.currentItemHover === "Color" &&
              i.id + a.name !== e.currentTarget.id &&
              a.id === this.state.currentItemHover
            ) {
              return (document.getElementById(i.id + a.name).style.cssText = `
            background-color: ${i.id};
            
            `);
            } else {
              return null;
            }

            //console.log(e.target.id)
          });
        })
      );
    });
  }

  render() {
    const {
      currencyIcon,
      itemsQuantity,
      setItemsQuantity,
      setAddedItemsId,
      cartDatatest,
      setCartDatatest,
      setSize,
      setCapacity,
      setClothesSize,
      setCurrencyToggleAndCartToggle,
    } = this.context;

    return (
      <>
        <Header />
        <div
          className="item-container"
          onClick={() => setCurrencyToggleAndCartToggle()}
        >
          {this.state.data.map((item, index) => (
            <>
              
              <div className="item-left-side" key={index}>
                {item.gallery.map((a, index) => (
                  <img
                    onClick={(e) =>
                      this.setState({
                        imageIndex: index,
                      })
                    }
                    key={index}
                    id={index}
                    src={a}
                    className="item-left-image-one"
                    alt="itemimage"
                    style={{ opacity: item.inStock ? 1 : 0.5 }}
                  ></img>
                ))}
              </div>

              <div className="item-right-side">
                <div
                  className="item-right-side-picture"
                  disabled={!item.inStock}
                  style={{ opacity: item.inStock ? 1 : 0.5 }}
                >
                  {!item.inStock && <p id="item-outOfStock">OUT OF STOCK</p>}
                  <img
                    src={item.gallery[this.state.imageIndex]}
                    alt="itemimage"
                  ></img>
                </div>
                <div className="item-rigth-side-content">
                  <p className="item-title">{item.name}</p>
                  <p className="item-title2">{item.brand}</p>

                  {item.attributes
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return -1;
                      }
                      if (a.id > b.id) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((a) => (
                      <>
                        <p className="size-title">{a.name.toUpperCase()}:</p>
                        <div
                          id={a.name}
                          style={{ display: "flex", flexDirection: "column" }}
                          onMouseOver={(e) => {
                            a.items.map((i) =>
                              this.setState({
                                currentItemHover: e.currentTarget.id,
                                currentItemHover2: i.id + e.currentTarget.id,
                              })
                            );
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            {a.items.map((i, index) => (
                              <button
                                style={{ backgroundColor: i.value }}
                                onClick={(e) => this.sizeClick(e)}
                                id={i.id + a.name}
                                value={i.displayValue}
                                className={"cart-content-item-size-one-full"}
                                name={a.name}
                                ref={this.myRef}
                              >
                                {a.type === "text" && i.value}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}

                  <p className="item-price-title">PRICE:</p>
                  <p className="item-price">
                    {currencyIcon}
                    {currencyIcon === "$"
                      ? item.prices[0].amount
                      : currencyIcon === "€"
                      ? item.prices[1].amount
                      : currencyIcon === "¥"
                      ? item.prices[3].amount
                      : currencyIcon === "A$"
                      ? item.prices[2].amount
                      : currencyIcon === "₽"
                      ? item.prices[4].amount
                      : null}
                  </p>
                  <button
                    className="item-buttton"
                    onClick={(e) => {
                      setItemsQuantity(+itemsQuantity + 1);
                      window.localStorage.setItem("itemSize", this.state.size);
                      const x = localStorage.getItem("itemSize");
                      window.localStorage.setItem(
                        "itemCapacity",
                        this.state.capacity
                      );
                      window.localStorage.setItem(
                        "clothesSize",
                        this.state.clothesSize
                      );
                      setCapacity(this.state.capacity);
                      setSize(x);
                      setClothesSize(this.state.clothesSize);
                      window.localStorage.setItem(
                        "itemsQuantity",
                        +itemsQuantity + 1
                      );
                      setAddedItemsId(item.id);
                      //console.log(item.id);
                      const items = {
                        name: item.name,
                        id: item.id,
                        brand: item.brand,
                        prices: item.prices,
                        gallery: item.gallery,
                        description: item.description,
                        attributes: item.attributes,
                        quantity: 1,
                        capacity: this.state.capacity,
                        color: this.state.color,
                        size: this.state.size,
                        clothesSize: "",
                        touchIdInKeyboard: this.state.touchIdInKeyboard,
                        withUsb3Ports: this.state.withUsb3Ports,
                      };
                      const json = JSON.stringify(items);
                      window.localStorage.setItem("selectedItem", json);
                      this.state.size
                        ? setCartDatatest(items)
                        : this.state.color && this.state.capacity
                        ? setCartDatatest(items)
                        : this.state.touchIdInKeyboard &&
                          this.state.withUsb3Ports &&
                          this.state.capacity
                        ? setCartDatatest(items)
                        : alert("please select attributes");
                      //window.localStorage.setItem("test", cartDatatest);
                      //console.log(cartDatatest);

                      localStorage.setItem(
                        "ourarraykey",
                        JSON.stringify(cartDatatest)
                      );
                    }}
                    disabled={!item.inStock}
                  >
                    ADD TO CART
                  </button>

                  <Markup
                    content={item.description}
                    tagName="div"
                    className="item-description"
                  />

                  {}
                </div>
              </div>
            </>
          ))}

          <div
            id="pop-up"
            onClick={() => setCurrencyToggleAndCartToggle()}
          ></div>
        </div>
      </>
    );
  }
}

export default Item;
