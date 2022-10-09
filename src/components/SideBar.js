import React from "react";
import GlobalContext from "../context/GlobalVars";
import { withRouter } from "react-router-dom";
//import getData from "../utils/func";
class SideBar extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.colorRef = [];
    this.withUsbRef = [];
    this.touchRef = [];
    this.sizeRef = React.createRef([]);
    this.capacityRef = React.createRef([]);
    this.widthUsbRef = React.createRef([]);
    this.state = {
      category: "all",
      data: [],
      isLoading: true,
      attributes: [],
      isColorActive: false,
      filterData: [],
      itemData: [],
    };
  }
  getData = () => {
    const location = this.props.location;
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
           attributes{
              id
              name
              type
              items{
                id
                displayValue
                value
              }
            }
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
          });
        })
        .catch(console.error);
    }
  };

  //parse query info

  getQueryStringParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };

  //end

  updateRefs = () => {
    const { setFiltereddata, filteredData, deteleData } = this.context;
    return filteredData.map((a, index) => {
      switch (a.name) {
        case "Color":
         this.colorRef
            .filter((item) => item.id === a.value)
            .map((p) => {
              if (p.id === a.value) {
                p.title = a.id;
                p.className = "colorButtons colorActive";
              }
            });
          break;
        case "Size":
         if(this.sizeRef.current !== null){
            this.sizeRef.current.innerHTML = a.value
            this.sizeRef.current.value = a.value
            this.sizeRef.current.parentNode.title = a.id
          }
          break;
        case "Capacity":
          if(this.capacityRef.current !== null){
              this.capacityRef.current.innerHTML = a.value
              this.capacityRef.current.value = a.value
              this.capacityRef.current.parentNode.title = a.id
            }
        case "With USB 3 ports" || "Touch ID in keyboard":
          this.withUsbRef
            .filter(Boolean)
            .filter(
              (item) => a.name + a.value === item.name && item.value === a.value
            )
            .map((p) => {
              if (a.name + a.value === p.name) {
                p.title = a.id;
                p.checked = true;
              }
            });
        case "Touch ID in keyboard":
          this.touchRef
            .filter(Boolean)
            .filter(
              (item) => a.name + a.value === item.name && item.value === a.value
            )
            .map((p) => {
              if (a.name + a.value === p.name) {
                p.title = a.id;
                p.checked = true;
              }
            });
        default:
      }
    });
  };
  componentDidMount() {
    this.getData();
    this.setState({
      filterData: JSON.parse(localStorage.getItem("filteredData")),
    });
    const searchData = this.getQueryStringParams(this.props.location.search);
    this.props.location.search &&
      localStorage.setItem(
        "filteredData",
        JSON.stringify(JSON.parse(searchData.filter))
      );
  }

  //


  componentDidUpdate(prevProps, prevState) {
    const location = this.props.location;
    const {filteredData, deteleData } = this.context;
    this.updateRefs();
    function clearArray(array) {
      while (array.length > 0) {
        array.pop();
      }
    }
    if (prevProps.location.pathname !== location.pathname ) {
      filteredData.forEach(a=> deteleData(a.id))
      const data = clearArray(filteredData)
      localStorage.setItem("filteredData", JSON.stringify(data))
      this.getData();
      
    }
    
  }
  // componentWillUnmount() {
  //   console.log("unmount sidebar");
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }

  //filter same values in data

  filterdata = (data) => {
    return Array.from(new Set(data.map((a) => a.id))).map((id) => {
      return data.find((a) => a.id === id);
    });
  };

  /// handle color changes
  colorClick(e, a, k, id, setFiltereddata, deteleData) {
    if (
      e.currentTarget.className === "colorButtons colorNotActive" &&
      e.currentTarget.id === a
    ) {
      e.currentTarget.className = "colorButtons colorActive";
      e.currentTarget.title = id();
      setFiltereddata(e.currentTarget.id, k, e.currentTarget.title);
    } else if (
      e.currentTarget.className === "colorButtons colorActive" &&
      e.currentTarget.id === a
    ) {
      this.colorRef
        .filter((p) => p.id === e.currentTarget.id)
        .map((c) => {
          //console.log(c)
          deteleData(e.currentTarget.title);
          c.className = "colorButtons colorNotActive";
        });
    }
  }

  /// handle chekbox section changes
  checkBoxClick(e, a, k, id, setFiltereddata, deteleData) {
    if (e.currentTarget.checked) {
      e.currentTarget.title = id();
      return setFiltereddata(e.currentTarget.value, k, e.currentTarget.title);
    }
    return deteleData(e.currentTarget.title);
  }

  /// handle size change

  sizeClick(e, k, id, setFiltereddata, deteleData) {
    if (e.currentTarget.value !== "") {
      e.currentTarget.title = id();
      setFiltereddata(e.currentTarget.value, k, e.currentTarget.title);
    } else {
      this.sizeRef.current.innerHTML = '-';
      deteleData(e.currentTarget.title);
    }
  }

  ///handle capacity changes

  capacityClick(e, k, id, setFiltereddata, deteleData) {
    if (e.currentTarget.value !== "") {
      e.currentTarget.title = id();
      setFiltereddata(e.currentTarget.value, k, e.currentTarget.title);
    } else {
      deteleData(e.currentTarget.title);
    }
  }

  //
  render() {
    const { data, isLoading } = this.state;
    const { setFiltereddata, filteredData, deteleData } = this.context;
    //generate random id
    const id = function () {
      return Math.random().toString(36).substring(2, 6);
    };
    //take data from attributtes, size, capacity
    let attributes = [];
    let size = [];
    let capacity = [];
    console.log(filteredData);
    if (isLoading) {
      return null;
    } else {
      data.map((a) => {
        //   console.log(a)
        a.attributes.map((i) => {
          //console.log(i)
          attributes.push(i);
          if (i.name === "Size") {
            i.items.map((a) => size.push(a));
            const filtSize = this.filterdata(size);
            size = [...filtSize];
          } else if (i.name === "Capacity") {
            i.items.map((a) => capacity.push(a));
            const filtSize = this.filterdata(capacity);
            capacity = [...filtSize];
          }
        });
      });
     //filter same data from attributes array
      const filteredAttributes = Array.from(
        new Set(attributes.map((a) => a.id))
      ).map((id) => {
        return attributes.find((a) => a.id === id);
      });
      attributes = [...filteredAttributes];
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
        <form
          action="/action_page.php"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label htmlFor="clothes">Filter:</label>
          {attributes.map((k,index) => {
            //console.log(k)
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }} key={index}>
                <h3>{k.id}</h3>
                {k.id === "Size" && k.type === "text" ? (
                  <select
                    title=""
                    id={k.id}
                    onChange={(e) =>
                      this.sizeClick(e, k.id, id, setFiltereddata, deteleData)
                    }
                  >
                    
                    <option value="" ref={this.sizeRef} default>
                      -
                    </option>
                    {
                      filteredData.length > 0 && filteredData.some(a=> a.name ==='Size') &&
                      <option value="" >
                      -
                    </option>
                    }
                    {size.map((a,index) => {
                      // console.log(a)
                      return (
                        <option value={a.displayValue} key={index}>{a.displayValue}</option>
                      );
                    })}
                  </select>
                ) : k.id === "Capacity" ? (
                  <select
                    title=""
                    id={k.id}
                    onChange={(e) =>
                      this.capacityClick(
                        e,
                        k.id,
                        id,
                        setFiltereddata,
                        deteleData
                      )
                    }
                  >
                    <option value="" ref={this.capacityRef}>
                      -
                    </option>
                    {
                      filteredData.length > 0 && filteredData.some(a=> a.name ==='Capacity') &&
                      <option value="" >
                      -
                    </option>
                    }
                    {capacity.map((a,index) => {
                      //console.log(a)
                      return (
                        <option value={a.displayValue} key={index}>{a.displayValue}</option>
                      );
                    })}
                  </select>
                ) : (
                  k.items.map((a, index) => {
                    //console.log(a)
                    return k.id === "Color" ? (
                      <div
                        style={{ backgroundColor: a.id }}
                        className="colorButtons colorNotActive"
                        id={a.id}
                        title=""
                        ref={(ref) => {
                          this.colorRef[index] = ref;
                          return true;
                        }}
                        onClick={(e) =>
                          this.colorClick(
                            e,
                            a.id,
                            k.id,
                            id,
                            setFiltereddata,
                            deteleData
                          )
                        }
                        key={index}
                      ></div>
                    ) : a.id === "Yes" || a.id === "No" ? (
                      <div className="checbox-container">
                        <input
                          type="checkbox"
                          value={a.id}
                          name={k.id + a.id}
                          title=""
                          onClick={(e) =>
                            this.checkBoxClick(
                              e,
                              a.id,
                              k.id,
                              id,
                              setFiltereddata,
                              deteleData
                            )
                          }
                          ref={(ref) => {
                            if (ref && ref.name.includes("With USB 3 ports")) {
                              this.withUsbRef[index] = ref;
                            }
                            this.touchRef[index] = ref;
                            return true;
                          }}
                        />
                        <label htmlFor={k.id + a.id}> {a.id}</label>
                      </div>
                    ) : (
                      ""
                    );
                  })
                )}
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default withRouter(SideBar);
