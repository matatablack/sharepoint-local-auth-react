import React, { Component } from "react";
import App from "./App";
import fetchData from "./utils/fetchData";
import { documentsURL, quickLinksURL, userURL } from "./utils/fetchURL";
import formatData from "./utils/formatData";
import { isDevelopment } from "./constants";

const StoreContext = React.createContext();
const StoreProvider = StoreContext.Provider;
const StoreConsumer = StoreContext.Consumer;

class Container extends Component {
  state = {
    data: {
      documents: [],
      tree: []
    },
    isLoading: true,
    results: [],
    user: {
      name: "",
      groups: "",
      isAdmin: false
    }
  };

  componentDidMount() {
    this.fetchDocuments();
    this.getCurrenUser();
  }

  fetchDocuments = async () => {
    const data = await fetchData(documentsURL);
    this.setState({ data: formatData(data), isLoading: false });
  };

  fetchLinks = async () => {
    const data = await fetchData(quickLinksURL);
    const links = data.map(l => ({ title: l.Title, url: l.url.Url }));
    this.setState({
      links,
      isLoading: false
    });
  };

  async getCurrenUser() {
    const user = await fetchData(userURL);
    this.setState({
      user: {
        name: user.Title || "",
        groups: user.Groups || [],
        isAdmin:
          user.Groups && isDevelopment ? false : user.Groups.results.indexOf("Administrators")
      }
    });
  }

  render() {
    const actions = {
      filterData: this.filterData,
      fetchLinks: this.fetchLinks,
      fetchDocuments: this.fetchDocuments,
      fetchUserName: this.getCurrenUser
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

/*   filterData = ({ categoria, subcategoria, code }) => {
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
  }; */
