import React, { Component } from "react";

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  // Context state

  constructor(props) {
    super(props);
    var storedArray = localStorage.getItem("ourarraykey");
    let ourArray = JSON.parse(storedArray);
    this.state = {
      currencyIcon: localStorage.getItem("currencyIcon") || '$',
      currency: localStorage.getItem("currency") || 'USD',
      itemsQuantity: localStorage.getItem("itemsQuantity") || 0,
      individualItemsQuantity:1 || localStorage.getItem("individualItemsQuantity"),
      addedItemsId: localStorage.getItem("addedItemsId"),
      selectedItem: JSON.parse(localStorage.getItem("selectedItem")),
      cartDatatest: ourArray || [],
      individualQuantity: 1,
      cartCount: localStorage.getItem("cartCount"),
      itemSize: localStorage.getItem("itemSize"),
      itemCapacity: localStorage.getItem("itemCapacity"),
      clothesSize: "",
      localData: [],
      category: 'All',
      cartToggle:false,
      currencyToggle:false,
      vectorToggle:false,
     

    };
  }
  // Method to update state
  setCurrencyIcon = (currencyIcon) => {
    this.setState((prevState) => ({ currencyIcon }));
  };
  setCurrency = (currency) => {
    this.setState((prevState) => ({ currency }));
  };
  setItemsQuantity = (itemsQuantity) => {
    this.setState((prevState) => ({ itemsQuantity }));
  };
  setIndividualItemsQuantity = (individualItemsQuantity) => {
    this.setState((prevState) => ({ individualItemsQuantity }));
  };
  setAddedItemsId = (addedItemsId) => {
    this.setState((prevState) => ({ addedItemsId }));
  };

  setIndividualQuantity = (quantity) => {
    this.setState((prevState) => {
      let quant = Object.assign({}, prevState.quantity);
      quant.quantity = prevState.quantity + 1;
      return { quant };
    });
  };

  setCartCount = (cartCount) => {
    this.setState((prevState) => ({ cartCount }));
  };

  setSize = (itemSize) => {
    this.setState((prevState) => ({ itemSize }));
  };
  setCapacity = (itemCapacity) => {
    this.setState((prevState) => ({ itemCapacity }));
  };
  setClothesSize = (clothesSize) => {
    this.setState((prevState) => ({ clothesSize }));
  };
  setCartToggle= (cartToggle) => {
    this.setState({ 
      
      cartToggle: !this.state.cartToggle,
      currencyToggle:false,
      vectorToggle:false,
    
    });
  };

  setCurrencyToggle= (currencyToggle) => {
    this.setState({ 
      
      currencyToggle: !this.state.currencyToggle,
      vectorToggle:!this.state.vectorToggle,
      cartToggle:false
    
    });
  };
  setCurrencyToggleAndCartToggle= () => {
    this.setState({ 
      
      currencyToggle: false,
      cartToggle:false,
      vectorToggle:false,
    });
    
      document.getElementById("pop-up").style.display = "none";
    
  };

  setCartDatatest = (item) => {
    //const boo = this.state.cartDatatest.filter((a) => a.quantity > 0)
    const xd = this.state.cartDatatest.map((i,index) => {
      if(i.id===item.id){
        return(
          i.other=true,
          i.id=i.id+'-'+index
        )
       
      }else {
        return null
      }
    
    });
    // const xd2 = JSON.parse(this.state.selectedItem)
    //console.log(JSON.parse(this.state.selectedItem))
   // console.log(item.quantity);
    //console.log(this.state.cartDatatest.map(i=>i.id))
    // console.log(item.id)
    //console.log(this.state.cartDatatest.map(i=>i.id.includes(item.id)))
    //const x = JSON.parse(this.state.selectedItem)
    if (xd.includes(item.id)) {
      //console.log("dsadas");
      this.state.cartDatatest.map(
        (ips) =>
          ips.id === item.id && {
            name: item.name,
            id: item.id,
            brand: item.brand,
            prices: item.prices,
            gallery: item.gallery,
            description: item.description,
            attributes: item.attributes,
            quantity: (ips.quantity += 1),
            deleted: false,
            size: item.size,
            clothesSize: item.clothesSize,
            color: item.color,
            capacity: item.capacity,
            
          }
      );
    } else if (xd.includes(item.id) && item.quantity < 0) {
      this.state.cartDatatest.push(item);
    } else {
      this.state.cartDatatest.push(item);
    }


    this.setState((prevState)=> {
      localStorage.setItem(
        "ourarraykey",
        JSON.stringify(prevState.cartDatatest)
      );
    })
   

    /*  
this.state.cartDatatest.map(i=> {
  console.log(i)
  if(i.id !==item.id){
     this.state.cartDatatest.push(item)
     console.log('dasdsa')
  }else{
    console.log('bbdgg')
  }

} )
      */
  };

  render() {
    const { children } = this.props;
    const {
      currencyIcon,
      currency,
      itemsQuantity,
      individualItemsQuantity,
      addedItemsId,
      selectedItem,
      cartDatatest,
      cartCount,
      itemSize,
      itemCapacity,
      clothesSize,
      category,
      currencyToggle,
      cartToggle,
      vectorToggle,
      

    } = this.state;
    const {
      setCurrencyIcon,
      setCurrency,
      setItemsQuantity,
      setIndividualItemsQuantity,
      setAddedItemsId,
      setCartDatatest,
      setIndividualQuantity,
      setCartCount,
      setSize,
      setCapacity,
      setClothesSize,
      setCartToggle,
      setCurrencyToggle,
      setCurrencyToggleAndCartToggle
    } = this;

    return (
      <GlobalContext.Provider
        value={{
          currencyIcon,
          setCurrencyIcon,
          setCurrency,
          setItemsQuantity,
          setIndividualItemsQuantity,
          itemsQuantity,
          individualItemsQuantity,
          currency,
          selectedItem,
          addedItemsId,
          setAddedItemsId,
          cartDatatest,
          setCartDatatest,
          setIndividualQuantity,
          cartCount,
          setCartCount,
          itemSize,
          setSize,
          setCapacity,
          itemCapacity,
          clothesSize,
          setClothesSize,
          category,
          currencyToggle,
          cartToggle,
          setCartToggle,
          setCurrencyToggle,
          setCurrencyToggleAndCartToggle,
          vectorToggle,
          
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;

export { GlobalProvider };
