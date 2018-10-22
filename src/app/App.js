import React from "react";
import { Layout } from "antd";
import { Footer, Content, Header } from "./components";

import "antd/dist/antd.min.css";
import "./App.css";

const App = props => (
  <div className="container">
    <Layout className="layout">
      <Header />
      <Content />
      <Footer />
    </Layout>
  </div>
);

export default App;
