import React from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalVars";
import { addTocarT, setItemId } from "./utils.js";
import addItemToCartPic from "../assets/Surface.png";
import addItemToCartPic2 from "../assets/EmptyCart.png";
export default class Content extends React.Component {

    static contextType = GlobalContext;
    constructor(props) {
      super(props);
      this.itemContent = [];
      this.itemContent2 = [];
      this.content = this.props.content;
      this.itemClick = this.props.itemClick;
      this.state = {
        data: [],
     
      };
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

    render(){
        const { currencyIcon, setAddedItemsId,data } =
        this.context;
        return(
        <div
        className="item-card"
        style={{ opacity: this.props.item.inStock ? 1 : 0.5 }}
        onMouseOver={(e) => {
          this.imageEnter(this.props.index);
          setAddedItemsId(this.props.item.id);
          //localStorage.setItem("category", 'item');
        }}
        onMouseLeave={() => {
          this.imageLeave(this.props.index);
        }}
        onClick={() => setItemId(data, this.context)}
        disabled={!this.props.item.inStock}
        key={this.props.index}
      >
        {!this.props.item.inStock && <p id="outOfStock">OUT OF STOCK</p>}
        <Link to="/item">
          <img src={this.props.item.gallery[0]} alt="itemimage"></img>
        </Link>
        <div
          className="hide"
          id={`'add-to-cart-home${this.props.index}'`}
          onClick={(e) => addTocarT(data, this.context)}
          ref={(ref) => (this.itemContent[this.props.index] = ref)}
        >
          {this.props.item.inStock && (
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
          id={`'card-content${this.props.index}'`}
          ref={(ref) => (this.itemContent2[this.props.index] = ref)}
        >
          <p className="item-name" name={this.props.item.name} id={this.props.item.id}>
            {this.props.item.name}
          </p>
          <p className="item-name">{this.props.item.brand}</p>
          <div className="item-price-container">
            <p className="item-price">
              {currencyIcon}
              {currencyIcon === "$"
                ? this.props.item.prices[0].amount
                : currencyIcon === "€"
                ? this.props.item.prices[1].amount
                : currencyIcon === "¥"
                ? this.props.item.prices[3].amount
                : currencyIcon === "A$"
                ? this.props.item.prices[2].amount
                : currencyIcon === "₽"
                ? this.props.item.prices[4].amount
                : null}
            </p>
          </div>
        </div>
      </div>
        )
    }

}