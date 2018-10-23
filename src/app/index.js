import React, { Component } from "react";
import App from "./App";
import Auth from "./utils/Auth";
import { fetchURL } from "./utils/fetchURL";
import formatData from "./utils/formatData";

const StoreContext = React.createContext();
const StoreProvider = StoreContext.Provider;
const StoreConsumer = StoreContext.Consumer;

const isDevelopment = true;
class Container extends Component {
  state = {
    data: {
      documents: [],
      tree: []
    },
    isLoading: true,
    results: []
  };

  async componentDidMount() {
    if (isDevelopment) {
      const authToken = await Auth.getToken();
      this.setState({ authToken });
    }
    this._fetchData();
  }

  async _fetchData() {
    this.setState({ isLoading: true });

    const productionHeaders = new Headers({ Accept: "application/json;odata=verbose" });
    const developMentHeaders = new Headers({
      Accept: "application/json;odata=nometadata",
      Authorization: `Bearer ${this.state.authToken}`
    });

    const data = await fetch(fetchURL, {
      headers: isDevelopment ? developMentHeaders : productionHeaders
    })
      .then(res => res.json())
      .then(d => {
        if (isDevelopment) {
          return d.value;
        } else {
          return d.d.results;
        }
      })
      .catch(err => console.error("Error fetching data", err));

    /* console.log("%c Original data:", "background: #000; color: #bada55", data);
    console.log("%c Formatted data:", "background: #bada55; color: #000", formatData(data)); */

    /* {
      headers: 
    } */

    this.setState({ data: formatData(data), isLoading: false });
  }

  filterData = ({ categoria, subcategoria, code }) => {
    //TODO
    // poder recibir un array de categorias // array.oneOf()

    const result = this.state.data.documents.filter(doc => {
      let match = true;

      if (
        (categoria && doc.categoria !== categoria) ||
        (subcategoria && doc.subcategoria !== subcategoria) ||
        (code && doc.code !== code)
      ) {
        match = false;
      }

      return match;
    });

    console.log(result);

    this.setState({ result });
  };

  render() {
    const actions = {
      filterData: this.filterData
    };

    return (
      <StoreProvider value={{ actions, store: this.state }}>
        <App />
      </StoreProvider>
    );
  }
}

function connect(Component) {
  return props => (
    <StoreConsumer>
      {({ actions, store }) => <Component {...props} actions={actions} store={store} />}
    </StoreConsumer>
  );
}

export { StoreConsumer, connect, Container as default };
