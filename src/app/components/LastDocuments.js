import React, { Fragment } from "react";
import { Card, List, Icon } from "antd";
import { connect } from "./../";

function LastDocuments({ store }) {
  const { documents } = store.data;
  const data = documents.sort((a, b) => b.created - a.created);
  return (
    <Fragment>
      <Card
        title="Last documents uploaded"
        extra={<Icon type="sync" theme="outlined" />}
        bodyStyle={{ padding: "5px 24px" }}
        hoverable
        style={{ minHeight: "360px" }}
        bordered={false}
      >
        <List
          loading={store.isLoading}
          dataSource={data
            .filter((v, i) => i < 4)
            .map(doc => ({ ...doc, created: new Date(doc.created).toLocaleDateString() }))}
          renderItem={({ url, name, created }) => (
            <List.Item className="quick-links__link">
              <a href={`https://partner.coca-cola.com${url}`} download>
                <List.Item.Meta
                  title={
                    <span title={name}>{name.length > 38 ? name.substr(0, 38) + "..." : name}</span>
                  }
                  description={created}
                />
              </a>
            </List.Item>
          )}
        />
      </Card>
    </Fragment>
  );
}

export default connect(LastDocuments);
