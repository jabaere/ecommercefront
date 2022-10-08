import React, { Component } from "react";
import { withRouter } from "react-router-dom";
const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  // Context state

  constructor(props) {
    var category = sessionStorage.getItem("key");
    super(props);
    var storedArray = localStorage.getItem("ourarraykey");
    let ourArray = JSON.parse(storedArray);
    this.state = {
      currencyIcon: localStorage.getItem("currencyIcon") || "$",
      currency: localStorage.getItem("currency") || "USD",
      itemsQuantity: localStorage.getItem("itemsQuantity") || 0,
      individualItemsQuantity:
        1 || localStorage.getItem("individualItemsQuantity"),
      addedItemsId: localStorage.getItem("addedItemsId"),
      selectedItem: JSON.parse(localStorage.getItem("selectedItem")),
      cartDatatest: ourArray || [],
      individualQuantity: 1,
      cartCount: localStorage.getItem("cartCount"),
      itemSize: localStorage.getItem("itemSize"),
      itemCapacity: localStorage.getItem("itemCapacity"),
      clothesSize: "",
      localData: [],
      category: localStorage.getItem("category") || "all",
      cartToggle: false,
      currencyToggle: false,
      vectorToggle: false,
      filteredData: [],
      data: [],
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
  setCartToggle = (cartToggle) => {
    this.setState({
      cartToggle: !this.state.cartToggle,
      currencyToggle: false,
      vectorToggle: false,
    });
  };

  setCurrencyToggle = (currencyToggle) => {
    this.setState({
      currencyToggle: !this.state.currencyToggle,
      vectorToggle: !this.state.vectorToggle,
      cartToggle: false,
    });
  };
  setCurrencyToggleAndCartToggle = () => {
    this.setState({
      currencyToggle: false,
      cartToggle: false,
      vectorToggle: false,
    });

    document.getElementById("pop-up").style.display = "none";
  };

  ///

  getData() {
    const category =
      localStorage.getItem("category") || sessionStorage.getItem("category");
    if (category !== "all") {
      const query = `
      query GetByTitle {
        category (input:{
        title:"${category}"
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
                  displayValue
                  value
                  id
                }
              }
              prices{
                currency{
                  label
                  symbol
                }
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
          console.log(data);
          this.setState({
            data: data.category.products,
            isLoading: false,
            category: category,
          });

          console.log(data);
        })
        .catch(console.error);
    } else {
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
              currency{
                label
                symbol
              }
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
            isLoading: false,
            category: category,
          });
        })
        .catch(console.error);
    }
  }

  //--------------------------------filter section

  updateURL() {
    const url = new URL(window.location);
    this.state.filteredData !== null &&
      this.state.filteredData.map((a) => {
        const data = this.state.filteredData;
        url.searchParams.set("filter", JSON.stringify(data));
        return window.history.pushState({}, "", url);
      });
  }

  setFiltereddata = (value, name, id) => {
    //filter data from same object values
    this.setState((prevState) => ({
      filteredData: [...this.state.filteredData, { name, value, id }],
      // data: this.state.data.filter(item=> item.attributes.some(a=> a.items.some(i=> i.id===value)))
    }));

    //update data if category name is Size and Capacity\
    const indexOfSize = this.state.filteredData.findIndex((object) => {
      return object.name === "Size";
    });
    const indexOfCapacity = this.state.filteredData.findIndex((object) => {
      return object.name === "Capacity";
    });

    if (name === "Size" && indexOfSize !== -1) {
      const newArr = this.state.filteredData.map((object) => {
        if (object.name === "Size") {
          return { ...object, name, value, id };
        }
        return { ...object };
      });
      this.setState({
        filteredData: newArr,
      });
      localStorage.setItem("filteredData", JSON.stringify(newArr));
    } else if (name === "Capacity" && indexOfCapacity !== -1) {
      const newArr = this.state.filteredData.map((object) => {
        if (object.name === "Capacity") {
          return { ...object, name, value, id };
        }
        return { ...object };
      });
      this.setState({
        filteredData: newArr,
      });
      localStorage.setItem("filteredData", JSON.stringify(newArr));
    }
  };

  deteleData = (id, name) => {
    console.log(id);
    this.setState((prevState) => ({
      filteredData: this.state.filteredData.filter((a) => a.id !== id),
    }));
    localStorage.setItem(
      "filteredData",
      JSON.stringify(this.state.filteredData.filter((a) => a.id !== id))
    );
    console.log("called deteleData");
  };
  componentDidUpdate(prevProps, prevState) {
    this.updateURL();
    const category =
      localStorage.getItem("category") || sessionStorage.getItem("category");
    let notEqual = this.state.category !== category;
    if (notEqual) {
      console.log("new data");
      this.getData();
      localStorage.setItem(
        "filteredData",
        JSON.stringify(this.state.filteredData)
      );
    }
    localStorage.setItem(
      "filteredData",
      JSON.stringify(this.state.filteredData)
    );
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem("filteredData"));
    storage !== null &&
      this.setState({
        filteredData: storage,
      });
    this.getData();
  }

  //----------------------------------filter section - end

  setCartDatatest = (item) => {
    //const boo = this.state.cartDatatest.filter((a) => a.quantity > 0)
    const xd = this.state.cartDatatest.map((i, index) => {
      if (i.id === item.id) {
        return (i.other = true), (i.id = i.id + "-" + index);
      } else {
        return null;
      }
    });

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

    this.setState((prevState) => {
      localStorage.setItem(
        "ourarraykey",
        JSON.stringify(prevState.cartDatatest)
      );
    });
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
      filteredData,
      data,
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
      setCurrencyToggleAndCartToggle,
      setFiltereddata,
      deteleData,
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
          setFiltereddata,
          filteredData,
          deteleData,
          data,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  }
}
export default GlobalContext;
export { GlobalProvider };
