import React from "react";
import { Card } from "antd";
import { Filters, Tree } from "./";

export default function Documents() {
  return (
    <Card
      title={<h3 style={{ margin: 0 }}> Documents </h3>}
      extra={<a href="http://google.com"> View All </a>}
      style={{ height: "100%" }}
      hoverable
    >
      <Filters />
      <Tree />
    </Card>
  );
}
