import React from "react";
import { Breadcrumb, Card } from "antd";
import { HomeOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
const BreadcrumbComponent = () => {
  return (
    <Card style={{ marginBottom: "16px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <VerticalAlignMiddleOutlined />
          <span>Integrations</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Categories</Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};

export default BreadcrumbComponent;
