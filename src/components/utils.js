export function addTocarT(data, context) {
  const {
    setAddedItemsId,
    cartDatatest,
    setCartDatatest,
    setCartCount,
    addedItemsId,
  } = context;

  //console.log("dasdaasde");
  data
    .filter((item) => item.id === addedItemsId)
    .map((item) => {
      //setItemsQuantity(+itemsQuantity+1)
      //window.localStorage.setItem('itemsQuantity',+itemsQuantity+1)
      setAddedItemsId(item.id);
      window.localStorage.setItem("addedItemsId", item.id);
      //console.log(item.id);
      var items;
      if (item.attributes.length === 1) {
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
          capacity: "",
          clothesSize: "",
        };
      } else if (item.attributes.length === 2) {
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
          size: "",
          color: "Green",
          capacity: item.attributes[0].items[0].displayValue,
          clothesSize: "",
        };
      } else if (item.attributes.length > 2) {
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
          size: "",
          color: "",
          capacity: item.attributes[0].items[0].displayValue,
          clothesSize: "",
          touchIdInKeyboard: "Yes",
          withUsb3Ports: "Yes",
        };
      } else {
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
          size: "",
          color: "",
          capacity: "",
          clothesSize: "",
        };
      }

      const json = JSON.stringify(items);
      window.localStorage.setItem("selectedItem", json);
      setCartCount(cartDatatest.length);

      return setCartDatatest(items);
    });
}

export function addToCartFromPdp(
  data,
  context,
  capacity,
  color,
  size,
  touchIdInKeyboard,
  withUsb3Ports
) {
  const {
    itemsQuantity,
    setItemsQuantity,
    setAddedItemsId,
    cartDatatest,
    setCartDatatest,
    setSize,
    setCapacity,
  } = context;

  data.map((item) => {
    setItemsQuantity(+itemsQuantity + 1);
    window.localStorage.setItem("itemSize", size);
    const x = localStorage.getItem("itemSize");
    window.localStorage.setItem("itemCapacity", capacity);

    setCapacity(capacity);
    setSize(x);

    window.localStorage.setItem("itemsQuantity", +itemsQuantity + 1);
    setAddedItemsId(item.id);
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
      capacity: capacity,
      color: color,
      size: size,
      clothesSize: "",
      touchIdInKeyboard: touchIdInKeyboard,
      withUsb3Ports: withUsb3Ports,
    };
    const json = JSON.stringify(items);
    window.localStorage.setItem("selectedItem", json);
    size
      ? setCartDatatest(items)
      : color && capacity
      ? setCartDatatest(items)
      : touchIdInKeyboard && withUsb3Ports && capacity
      ? setCartDatatest(items)
      : item.attributes.length === 0
      ? setCartDatatest(items)
      : alert("please select attributes");
    //window.localStorage.setItem("test", cartDatatest);
    //console.log(cartDatatest);

    return localStorage.setItem("ourarraykey", JSON.stringify(cartDatatest));
  });
}

export function setItemId(data, context) {
  const { setAddedItemsId, addedItemsId } = context;
  //localStorage.setItem("category", 'item');

  data
    .filter((item) => item.id === addedItemsId)
    .map((item) => {
      setAddedItemsId(item.id);
      return window.localStorage.setItem("addedItemsId", item.id);
    });
}

export function itemButtonClick(
  e,
  data,
  context,
  size,
  capacity,
  itemContent,
  itemContent2,
  currentItemHover
) {
  const { setSize, setCapacity } = context;
  window.localStorage.setItem("itemSize", size);
  window.localStorage.setItem("itemCapacity", capacity);
  setCapacity(capacity);
  setSize(size);

  data.map((item) => {
    return item.attributes.map((a, key) => {
      return a.items.map((i, index) => {
        let x = Number(e.currentTarget.attributes.index.nodeValue);

        const itemStyle = itemContent[index];
        const itemStyle2 = itemContent2[key];

        if (
          a.id === currentItemHover &&
          a.type === "text" &&
          i.id + a.name === e.currentTarget.id
        ) {
          return itemStyle2.childNodes[0].childNodes[index].className ===
            "cart-content-item-size-one-full"
            ? (itemStyle2.childNodes[0].childNodes[x].className =
                "cart-content-item-size-one-full cartActive")
            : (itemStyle2.childNodes[0].childNodes[index].className =
                "cart-content-item-size-one-full");
        } else if (
          a.id === currentItemHover &&
          a.type !== "text" &&
          itemStyle.id === e.currentTarget.id
        ) {
          return (itemStyle.style.cssText = `
              background-color: ${e.currentTarget.value};
              border: 4px solid #0099CC;
              border-radius: 4px
          `);
        } else if (
          i.id + a.name !== e.currentTarget.id &&
          a.id === currentItemHover &&
          currentItemHover !== "Color" &&
          itemStyle.id !== e.currentTarget.id
        ) {
          return (itemStyle2.childNodes[0].childNodes[index].className =
            "cart-content-item-size-one-full");
          //console.log("mesame")
        } else if (
          currentItemHover === "Color" &&
          i.id + a.name !== e.currentTarget.id &&
          a.id === currentItemHover &&
          itemStyle.id !== e.currentTarget.id
        ) {
          return (itemStyle.style.cssText = `
                background-color: ${i.id};
          
          `);
          //console.log("meotxe")
        } else {
          return null;
        }

        //console.log(e.target.id)
      });
    });
  });
}
