/*

import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";
import Header from "./Home2";
class Home extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.itemContent = [];
    this.itemContent2 = [];
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
  addTocarT(){
    const {
      setAddedItemsId,
      cartDatatest,
      setCartDatatest,
      setCartCount,
      addedItemsId
    } = this.context;
      
      
    this.state.data.filter(item=> item.id=== addedItemsId).map(item=>{
           //setItemsQuantity(+itemsQuantity+1)
                  //window.localStorage.setItem('itemsQuantity',+itemsQuantity+1)
                  setAddedItemsId(item.id);
                  window.localStorage.setItem("addedItemsId", item.id);
                  //console.log(item.id);
                  var items
                  if(item.attributes.length===1){
                      items = {
                      name: item.name,
                      id: item.id,
                      brand: item.brand,
                      prices: item.prices,
                      gallery: item.gallery,
                      description: item.description,
                      attributes: item.attributes,
                      quantity: 1,
                      deleted: false,
                      size: item.attributes[0].items[0].displayValue,
                      color: "",
                      capacity: '',
                      clothesSize: "",
                      
                    }
                   
                  }else if(item.attributes.length===2){
                    items = {
                      name: item.name,
                      id: item.id,
                      brand: item.brand,
                      prices: item.prices,
                      gallery: item.gallery,
                      description: item.description,
                      attributes: item.attributes,
                      quantity: 1,
                      deleted: false,
                      size: '',
                      color: "Green",
                      capacity: item.attributes[0].items[0].displayValue,
                      clothesSize: "",
                      
                    }
                  } else if(item.attributes.length > 2){
                    items = {
                      name: item.name,
                      id: item.id,
                      brand: item.brand,
                      prices: item.prices,
                      gallery: item.gallery,
                      description: item.description,
                      attributes: item.attributes,
                      quantity: 1,
                      deleted: false,
                      size: '',
                      color: "",
                      capacity: item.attributes[0].items[0].displayValue ,
                      clothesSize: "",
                      touchIdInKeyboard: "Yes",
                      withUsb3Ports: "Yes"
                    }
                  }else{
                    items = {
                      name: item.name,
                      id: item.id,
                      brand: item.brand,
                      prices: item.prices,
                      gallery: item.gallery,
                      description: item.description,
                      attributes: item.attributes,
                      quantity: 1,
                      deleted: false,
                      size: '',
                      color: "",
                      capacity: "",
                      clothesSize: "",
                     
                    }
                  }
              
                  const json = JSON.stringify(items);
                  window.localStorage.setItem("selectedItem", json);
                  setCartCount(cartDatatest.length);

                 return setCartDatatest(items);
    })
  }

  setItemId(){
    const {setAddedItemsId,addedItemsId} = this.context;
    this.state.data.filter(item=> item.id=== addedItemsId).map(item=>{

      setAddedItemsId(item.id);
      return window.localStorage.setItem("addedItemsId", item.id)
    }
  )}

  imageEnter = key => {
    const itemStyle = this.itemContent[key];
    const itemStyle2 = this.itemContent2[key].style;
    itemStyle.className === 'hide' && (itemStyle.className = 'show')
    itemStyle2.marginTop = 0
  }
  imageLeave = key => {
    const itemStyle = this.itemContent[key];
    const itemStyle2 = this.itemContent2[key].style;
    itemStyle.className ==='show' &&  (itemStyle.className = 'hide');
    itemStyle2.marginTop = "24px"
  };
  render() {
    const {
      currencyIcon,
      setAddedItemsId,
      setCurrencyToggleAndCartToggle,
      
    } = this.context;
      

    //const currency = localStorage.getItem("currency")
    //const currencyIcon = localStorage.getItem('currencyIcon')
    return (
      <div>
        <Header />
        <div
          className="product-title Cartmain"
          onClick={() => setCurrencyToggleAndCartToggle()}
        >
          All
        </div>
        <div className="items-container-home Cartmain" onClick={()=> setCurrencyToggleAndCartToggle()}>
          {this.state.data.map((item, index) => (
            <div
              className="item-card"
              style={{ opacity: item.inStock ? 1 : 0.5 }}
              onMouseOver={(e) => {
                this.imageEnter(index)
                setAddedItemsId(item.id)
              }}
              onMouseLeave={()=> {
                this.imageLeave(index)
              }}
              onClick={() => this.setItemId()}
              disabled={!item.inStock}
              key={index}
            >
              {!item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
              <Link to="/item">
                <img src={item.gallery[0]} alt="itemimage"></img>
              </Link>
              <div
                className="hide"
                id={`'add-to-cart-home${index}'`}
                onClick={(e) =>this.addTocarT()}
                ref={ref => (this.itemContent[index] = ref)}
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
              <div 
              className="card-content" 
              id={`'card-content${index}'`}
              ref={ref => (this.itemContent2[index] = ref)}
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

        <div id="pop-up" onClick={() => setCurrencyToggleAndCartToggle()}></div>
      </div>
    );
  }
}

export default Home;

*/
