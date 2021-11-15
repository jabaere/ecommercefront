import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";
import Header from "./Header";
class Tech extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const query = `
    query GetByTitle {
      category (input:{
      title:"tech"
      }) {
        name
        products{
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
              id
              displayValue
              value
            }
          }
          prices{
            currency
            amount
          }
          brand
        }
      }
      }  
      
      
    `;
    const url = "http://localhost:4000/graphql";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    };
    fetch(url, opts)
      .then((res) => res.json())
      .then(({ data }) => {
        this.setState({
          data: data.category.products,
        });

        //console.log(data.category.products)
      })
      .catch(console.error);
  }

  render() {
    const {
      currencyIcon,
      itemsQuantity,
      setItemsQuantity,
      setAddedItemsId,
      cartDatatest,
      setCartDatatest,
      setCurrencyToggleAndCartToggle,
    } = this.context;

    return (
      <>
        <Header />
        <div>
          <div
            className="product-title"
            onClick={() => {
              this.setState({
                currency: localStorage.getItem("currencyIcon"),
              });
              setCurrencyToggleAndCartToggle();
            }}
          >
            Tech
          </div>
          <div className="items-container-home">
            {this.state.data.map((item, index) => (
              <div
                className="item-card"
                style={{ opacity: item.inStock ? 1 : 0.5 }}
                onMouseOver={() => {
                  document.getElementById(
                    `'add-to-cart-home${index}'`
                  ).style.display = "flex";
                  document.getElementById(
                    `'card-content${index}'`
                  ).style.marginTop = 0;
                }}
                onMouseLeave={() => {
                  document.getElementById(
                    `'add-to-cart-home${index}'`
                  ).style.display = "none";
                  document.getElementById(
                    `'card-content${index}'`
                  ).style.marginTop = "24px";
                }}
                onClick={() => setAddedItemsId(item.id)}
              >
                {!item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
                <Link to="/item">
                  <img src={item.gallery[0]} alt="itemimage"></img>
                </Link>
                <div
                  className="add-to-cart-home"
                  id={`'add-to-cart-home${index}'`}
                  onClick={(e) => {
                    setItemsQuantity(+itemsQuantity + 1);
                    window.localStorage.setItem(
                      "itemsQuantity",
                      +itemsQuantity + 1
                    );
                    setAddedItemsId(item.id);
                    console.log(item.id);
                    const items = {
                      name: item.name,
                      id: item.id,
                      brand: item.brand,
                      prices: item.prices,
                      gallery: item.gallery,
                      description: item.description,
                      attributes: item.attributes,
                      quantity: 1,
                    };
                    const json = JSON.stringify(items);
                    window.localStorage.setItem("selectedItem", json);
                    setCartDatatest(items);
                    window.localStorage.setItem("test", cartDatatest);
                  }}
                >
                  {item.inStock && (
                    <>
                      <img src={addItemToCartPic} alt="addtocart"></img>
                      <img
                        className="add-to-cart-home-pic-two"
                        src={addItemToCartPic2}
                        alt="addtocart"
                      ></img>
                    </>
                  )}
                </div>
                <div className="card-content" id={`'card-content${index}'`}>
                  <p className="item-name" name={item.name} id={item.id}>
                    {item.name}
                  </p>
                  <div className="item-price-container">
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            id="pop-up"
            onClick={() => setCurrencyToggleAndCartToggle()}
          ></div>
        </div>
      </>
    );
  }
}

export default Tech;
