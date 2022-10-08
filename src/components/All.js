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
  

  render() {
    const { currencyIcon, setAddedItemsId, setCurrencyToggleAndCartToggle,data,filteredData } =
      this.context;
      const storage = JSON.parse(localStorage.getItem('filteredData')) || []
     

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
            .map((item, index)=><Content item={item} index={index} key={index}/>)
            :data
            .map((item, index) => <Content item={item} index={index} key={index}/>
          )}
        </div>

        <div id="pop-up" onClick={() => setCurrencyToggleAndCartToggle()}></div>
      </div>
    );
  }
}

export default withRouter(All);

//
