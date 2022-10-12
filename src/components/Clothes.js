import React from "react";
import GlobalContext from "../context/GlobalVars";
import Content from "./Content"
//import Header from "./Header";
class Clothes extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.itemContent = [];
    this.itemContent2 = [];
    this.myRef = React.createRef();
    this.state = {
      data: [],
    };
  }


  componentWillUnmount() {
    //console.log("unmount");
    this.setState = (state, callback) => {
      return;
    };
  }
  /*
  addToCart(){
    const {
      cartDatatest,
      setCartDatatest,
      addedItemsId
    } = this.context;
     
      
    this.state.data.filter(item=> addedItemsId===item.id).map(item=> {
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
      setCartDatatest(items);
      return  window.localStorage.setItem("test", cartDatatest);
    })
  }
  */



  render() {
    const { setCurrencyToggleAndCartToggle,data,filteredData } =
    this.context;

    return (
      <>
        <div className="common-container"  style={{width:'80%'}}>
          <div
            className="product-title Cartmain"
            onClick={() => setCurrencyToggleAndCartToggle()}
          >
            Clothes
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

export default Clothes;
