import React from "react";
import { Link } from "react-router-dom";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
import GlobalContext from "../context/GlobalVars";
import { addTocarT } from "./utils.js";
import { setItemId } from "./utils.js";
import Content from "./Content"
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

render() {
    const { setCurrencyToggleAndCartToggle,data,filteredData } =
    this.context;

    return (
      <>
        <div className="Cartmain"  style={{width:'80%'}}>
          <div
            className="product-title Cartmain"
            onClick={() => setCurrencyToggleAndCartToggle()}
          >
            Tech
          </div>
          {
          filteredData.length > 0 ?  data
            .filter(item=> item.attributes
            .some(a=> a.items.some(i=> filteredData.some(p=> i.id===p.value))))
            .map((item, index)=><Content item={item} index={index} key={index}/>)
            :data
            .map((item, index) => <Content item={item} index={index} key={index}/>
          )}

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
