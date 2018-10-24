import React from "react";
import { Card } from "antd";
import { Filters, Tree } from "./";
import { connect } from "./../";

function Documents(props) {
  return (
    <Card
      title={<h3 style={{ margin: 0, color: "white" }}> Documents </h3>}
      style={{ height: "100%" }}
      hoverable
      loading={props.store.isLoading}
      bordered={false}
    >
      {/* <Filters /> */}
      <Tree />
    </Card>
  );
}

export default connect(Documents);
