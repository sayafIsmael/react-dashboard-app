import { useState } from "react";
import { Card, Col, Row } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Dashboard = () => {
  const [statistics] = useState({
    software: null,
    service: null,
    category: null,
    subCategory: null,
  });

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta
              title={statistics.software === null ? "0" : statistics.software}
              description="Total Software"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta
              title={statistics.service === null ? "0" : statistics.service}
              description="Integration Services"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta
              title={statistics.category === null ? "0" : statistics.category}
              description="Integrations Category"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta
              title={
                statistics.subCategory === null ? "0" : statistics.subCategory
              }
              description="Sub Categories"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta title="205" description="Total Trigger" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta title="56" description="Total Followup" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta title="800" description="Total Software Client" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <PlusOutlined key="setting" />,
              <UnorderedListOutlined key="edit" />,
            ]}
            bordered={false}
          >
            <Meta title="7" description="Currently Logged in" />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
