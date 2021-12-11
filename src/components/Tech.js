import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";
import { addTocarT } from "./utils.js";
import {setItemId} from "./utils.js";
//import Header from "./Header";

class Tech extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.itemContent = [];
    this.itemContent2 = [];
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



  imageEnter = (key) => {
    const itemStyle = this.itemContent[key];
    const itemStyle2 = this.itemContent2[key].style;
    itemStyle.className === "hide" && (itemStyle.className = "show");
    itemStyle2.marginTop = 0;
  };
  imageLeave = (key) => {
    const itemStyle = this.itemContent[key];
    const itemStyle2 = this.itemContent2[key].style;
    itemStyle.className === "show" && (itemStyle.className = "hide");
    itemStyle2.marginTop = "24px";
  };

  render() {
    const { currencyIcon, setAddedItemsId, setCurrencyToggleAndCartToggle } =
      this.context;

    return (
      <>
        <div className="Cartmain">
          <div
            className="product-title Cartmain"
            onClick={() => setCurrencyToggleAndCartToggle()}
          >
            Tech
          </div>
          <div
            className="items-container-home Cartmain"
            onClick={() => setCurrencyToggleAndCartToggle()}
          >
            {this.state.data.map((item, index) => (
              <div
                className="item-card"
                style={{ opacity: item.inStock ? 1 : 0.5 }}
                onMouseOver={(e) => {
                  this.imageEnter(index);
                  setAddedItemsId(item.id);
                  //localStorage.setItem("category", 'item');
                }}
                onMouseLeave={() => {
                  this.imageLeave(index);
                }}
                onClick={() => {
                  setCurrencyToggleAndCartToggle();
                  setAddedItemsId(item.id);
                  setItemId(this.state.data, this.context)
                  //localStorage.setItem("category", 'item');
                }}
                key={index}
              >
                {!item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
                <Link to="/item">
                  <img src={item.gallery[0]} alt="itemimage"></img>
                </Link>
                <div
                  className="hide"
                  id={`'add-to-cart-home${index}'`}
                  onClick={(e) => addTocarT(this.state.data, this.context)}
                  ref={(ref) => (this.itemContent[index] = ref)}
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
                <div
                  className="card-content"
                  id={`'card-content${index}'`}
                  ref={(ref) => (this.itemContent2[index] = ref)}
                >
                  <p className="item-name" name={item.name} id={item.id}>
                    {item.name}
                  </p>
                  <p className="item-name">{item.brand}</p>
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
