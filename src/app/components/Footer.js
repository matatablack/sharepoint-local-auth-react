import React from "react";
import { Layout, Icon } from "antd";
import { connect } from "./../";

function Footer({ store }) {
  const adminLink =
    "https://partner.coca-cola.com/sites/TechnicalManagementSystemSLBU/Lists/Administrators/AllItems.aspx";

  const withLink = Comp =>
    store.user.isAdmin ? (
      <a href={adminLink} style={{ textDecoration: "none", color: "inherit" }}>
        {Comp}
      </a>
    ) : (
      Comp
    );

  return (
    <Layout.Footer className="layout-footer">
      {withLink(
        <span>
          <Icon
            type="deployment-unit"
            theme="outlined"
            style={{ fontSize: "18px", color: "red" }}
          />
          &nbsp; &nbsp; | &nbsp; &nbsp; Technical Management System SLBU
        </span>
      )}
      <span>Coca Cola Company - 2018</span>
    </Layout.Footer>
  );
}

export default connect(Footer);

/* <a href="javascript:void(0)" >
        
      </a> */
