export default function getData(){
    const location = this.props.location;
    const result = localStorage.getItem('category')
    console.log(result)
     console.log(location.pathname)
     if(result !== '/'){
        const query = `
        query GetByTitle {
          category (input:{
          title:"${result}"
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
                  id
                  displayValue
                  value
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
        console.log(data)
        this.setState({
          data: data.category.products,
        });

        console.log(data)
      })
      .catch(console.error);
     }
     else{
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
            });
           })
          .catch(console.error);
     }
}