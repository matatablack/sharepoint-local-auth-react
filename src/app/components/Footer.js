import React from "react";
import { Layout, Icon } from "antd";

export default function Footer() {
  return (
    <Layout.Footer className="layout-footer">
      <span>
        <Icon type="deployment-unit" theme="outlined" style={{ fontSize: "18px", color: "red" }} />
        &nbsp; &nbsp; | &nbsp; &nbsp; Technical Management System SLBU
      </span>
      <span>Coca Cola Company - 2018</span>
    </Layout.Footer>
  );
}
