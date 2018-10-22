import React from "react";
import { Layout, Icon } from "antd";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <Layout.Header className="layout-header">
      <img src={logo} alt="TechnicalManagementSlbu-Logo" className="layout-header__logo" />
      <span>
        <Icon type="user" theme="outlined" style={{ fontSize: "18px" }} />
        &nbsp; &nbsp; Matias Rodriguez [c]
      </span>
    </Layout.Header>
  );
}
