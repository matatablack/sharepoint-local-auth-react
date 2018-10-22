import React from "react";
import { Card, List, Tooltip, Icon } from "antd";

const data = [
  {
    title: "Racing car sprays burning fuel into crowd.",
    url: "https://google.com"
  },
  {
    title: "Australian walks 100km after outback crash., fter outback crash.",
    url: "https://google.com"
  },
  {
    title: "Los Angeles battles huge wildfires.",
    url: "https://google.com/Los-Angeles-battles-hugewildfires"
  }
];
export default function QuickLinks() {
  return (
    <Card
      title="Quick Links"
      extra={
        <Tooltip placement="topRight" title="Manage your links" arrowPointAtCenter>
          <Icon type="pushpin" theme="filled" />
        </Tooltip>
      }
      bodyStyle={{ padding: "5px 24px" }}
      hoverable
      style={{ minHeight: "30%" }}
    >
      <List
        dataSource={data}
        renderItem={({ title, url }) => (
          <List.Item className="quick-links__link">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <List.Item.Meta
                title={
                  <span title={title}>
                    {title.length > 38 ? title.substr(0, 38) + "..." : title}
                  </span>
                }
                description={
                  <span title={url}>{url.length > 38 ? url.substr(0, 38) + "..." : url}</span>
                }
              />
            </a>
          </List.Item>
        )}
      />
    </Card>
  );
}
