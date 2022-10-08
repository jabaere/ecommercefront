import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";
import { addTocarT, setItemId } from "./utils.js";
import { withRouter } from "react-router-dom";
import Content from "./Content"
//import Header from "./Header";
class All extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.itemContent = [];
    this.itemContent2 = [];
    this.content = this.props.content;
    this.itemClick = this.props.itemClick;
    this.state = {
      data: [],
      currency: "",
      test: [],
      price: [],
      stateData:[]
    };
  }
 //parse query info

    getQueryStringParams = query => {
      return query
          ? (/^[?#]/.test(query) ? query.slice(1) : query)
              .split('&')
              .reduce((params, param) => {
                      let [key, value] = param.split('=');
                      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                      return params;
                  }, {}
              )
          : {}
  };
  
  //end



  /*
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

  */
  /*
  setItemId() {
    const { setAddedItemsId, addedItemsId } = this.context;
    //localStorage.setItem("category", 'item');

    this.state.data
      .filter((item) => item.id === addedItemsId)
      .map((item) => {
        setAddedItemsId(item.id);
        return window.localStorage.setItem("addedItemsId", item.id);
      });
  }
  */

  // imageEnter = (key) => {
  //   const itemStyle = this.itemContent[key];
  //   const itemStyle2 = this.itemContent2[key].style;
  //   itemStyle.className === "hide" && (itemStyle.className = "show");
  //   itemStyle2.marginTop = 0;
  // };
  // imageLeave = (key) => {
  //   const itemStyle = this.itemContent[key];
  //   const itemStyle2 = this.itemContent2[key].style;
  //   itemStyle.className === "show" && (itemStyle.className = "hide");
  //   itemStyle2.marginTop = "24px";
  // };
  render() {
    const { currencyIcon, setAddedItemsId, setCurrencyToggleAndCartToggle,data,filteredData } =
      this.context;
      const storage = JSON.parse(localStorage.getItem('filteredData')) || []
      // const Content = ({item,index}) => {
      //   return <div
      //   className="item-card"
      //   style={{ opacity: item.inStock ? 1 : 0.5 }}
      //   onMouseOver={(e) => {
      //     this.imageEnter(index);
      //     setAddedItemsId(item.id);
      //     //localStorage.setItem("category", 'item');
      //   }}
      //   onMouseLeave={() => {
      //     this.imageLeave(index);
      //   }}
      //   onClick={() => setItemId(this.state.data, this.context)}
      //   disabled={!item.inStock}
      //   key={index}
      // >
      //   {!item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
      //   <Link to="/item">
      //     <img src={item.gallery[0]} alt="itemimage"></img>
      //   </Link>
      //   <div
      //     className="hide"
      //     id={`'add-to-cart-home${index}'`}
      //     onClick={(e) => addTocarT(this.state.data, this.context)}
      //     ref={(ref) => (this.itemContent[index] = ref)}
      //   >
      //     {item.inStock && (
      //       <>
      //         <img src={addItemToCartPic} alt="itemimage"></img>
      //         <img
      //           className="add-to-cart-home-pic-two"
      //           src={addItemToCartPic2}
      //           alt="itemimage"
      //         ></img>
      //       </>
      //     )}
      //   </div>
      //   <div
      //     className="card-content"
      //     id={`'card-content${index}'`}
      //     ref={(ref) => (this.itemContent2[index] = ref)}
      //   >
      //     <p className="item-name" name={item.name} id={item.id}>
      //       {item.name}
      //     </p>
      //     <p className="item-name">{item.brand}</p>
      //     <div className="item-price-container">
      //       <p className="item-price">
      //         {currencyIcon}
      //         {currencyIcon === "$"
      //           ? item.prices[0].amount
      //           : currencyIcon === "€"
      //           ? item.prices[1].amount
      //           : currencyIcon === "¥"
      //           ? item.prices[3].amount
      //           : currencyIcon === "A$"
      //           ? item.prices[2].amount
      //           : currencyIcon === "₽"
      //           ? item.prices[4].amount
      //           : null}
      //       </p>
      //     </div>
      //   </div>
      // </div>
      // }
    //const currency = localStorage.getItem("currency")
    //const currencyIcon = localStorage.getItem('currencyIcon')
    return (
      <div style={{width:'80%'}}>
        <div
          className="product-title Cartmain"
          onClick={() => setCurrencyToggleAndCartToggle()}
        >
          All
        </div>
        <div
          className="items-container-home Cartmain"
          onClick={() => setCurrencyToggleAndCartToggle()}
        >
          {
          filteredData.length > 0 ?  data
            .filter(item=> item.attributes
            .some(a=> a.items.some(i=> filteredData.some(p=> i.id===p.value))))
            .map((item, index)=><Content item={item} index={index}/>)
            :data
            .map((item, index) => <Content item={item} index={index}/>
          )}
        </div>

        <div id="pop-up" onClick={() => setCurrencyToggleAndCartToggle()}></div>
      </div>
    );
  }
}

export default withRouter(All);

//
