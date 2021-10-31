import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";

class Home extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currency: "",
      test: [],
      price: [],
    };
  }

  componentDidMount() {
    const { currency } = this.context;
    //console.log("dasdad" + " " + currency.toUpperCase());
    const query = `
query gettAlldata {
  category{
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
        const x = data.category.products.map((item) =>
          item.prices.filter((a) => a.currency === currency)
        );
        this.setState({
          price: x,
        });

        //console.log(data.category.products);
      })
      .catch(console.error);
  }

  render() {
    const {
      currencyIcon,

      setAddedItemsId,

      cartDatatest,
      setCartDatatest,
      setCartCount,
    } = this.context;

    //const currency = localStorage.getItem("currency")
    //const currencyIcon = localStorage.getItem('currencyIcon')
    return (
      <div>
        <div
          className="product-title"
          onClick={() => {
 
            this.setState({
              currency: localStorage.getItem("currencyIcon"),
            });

          }}
        >
          All
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
                //console.log(item.inStock);
              }}
              onMouseLeave={() => {
                document.getElementById(
                  `'add-to-cart-home${index}'`
                ).style.display = "none";
                document.getElementById(
                  `'card-content${index}'`
                ).style.marginTop = "24px";
              }}
              onClick={() => {
                setAddedItemsId(item.id);
                window.localStorage.setItem("addedItemsId", item.id);
              }}
              disabled={!item.inStock}
            >
              {!item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
              <Link to="/item">
                <img src={item.gallery[0]} alt="itemimage"></img>
              </Link>
              <div
                className="add-to-cart-home"
                id={`'add-to-cart-home${index}'`}
                onClick={(e) => {
                  //setItemsQuantity(+itemsQuantity+1)
                  //window.localStorage.setItem('itemsQuantity',+itemsQuantity+1)
                  setAddedItemsId(item.id);
                  window.localStorage.setItem("addedItemsId", item.id);
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
                    deleted: false,
                    size: "",
                    color: "",
                    capacity: "",
                    clothesSize: "",
                  };
                  const json = JSON.stringify(items);
                  window.localStorage.setItem("selectedItem", json);
                  setCartDatatest(items);
                  setCartCount(cartDatatest.length);
                  //?????????????????????????????????????????????????window.localStorage.setItem('test',cartDatatest)
                }}
              >
                {item.inStock && (
                  <>
                    <img src={addItemToCartPic} alt="itemimage"></img>
                    <img
                      className="add-to-cart-home-pic-two"
                      src={addItemToCartPic2}
                      alt="itemimage"
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
                      : null}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="pop-up"></div>
      </div>
    );
  }
}

export default Home;
