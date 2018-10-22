import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import { QuickLinks, LastDocuments, Documents } from "./";

export default function Content() {
  return (
    <Layout.Content className="layout-content">
      <Row type="flex" justify="space-between" gutter={16}>
        <Col span={17}>
          <Documents />
        </Col>
        <Col span={7}>
          <LastDocuments />
          <Divider className="aside__divider" />
          <QuickLinks />
        </Col>
      </Row>
    </Layout.Content>
  );
}
