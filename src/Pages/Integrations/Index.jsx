import React, { useContext, useState } from "react";
import { Breadcrumb, Card, Layout, Table, Spin, message } from "antd";
import { HomeOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { INTEGRATIONS_ADD } from "../../Utils/Route";
import IntegrationContext from "../../Context/integrationContext";
import { getColumn } from "./column";
import EditProject from "./Edit";
import { Axios } from "../../Utils/Axios";
import { Setting } from "../../Utils/Settings";
const { Content } = Layout;

const ManageIntegrations = () => {
  const { integrations, setIntegrations, loading, model, setModel } =
    useContext(IntegrationContext);

  const [actionLoader, setActionLoader] = useState(false);

  const updateStatus = (record, value) => {
    setActionLoader(true);
    Axios.post(`${Setting.api_base_url}/project/update`, {
      data: { _id: record._id, status: value },
    })
      .then((res) => {
        const updatedData = integrations.map((obj) => {
          if (obj._id === record._id) {
            return res.data.data;
          } else {
            return obj;
          }
        });
        setIntegrations(updatedData);
        message.success("Hurrah! Project successfully updated!", 10);
        setActionLoader(false);
      })
      .catch((err) => {
        message.error("Failed! Sorry try again later.", 10);
        setActionLoader(false);
      });
  };

  const deleteProject = (record) => {
    setActionLoader(true);
    Axios.post(`${Setting.api_base_url}/project/delete`, {
      data: { _id: record._id },
    })
      .then((res) => {
        setIntegrations((prev) =>
          prev.filter((project) => project._id !== record._id)
        );
        message.success("Hurrah! Project successfully deleted!", 10);
        setActionLoader(false);
      })
      .catch((err) => {
        message.error("Failed! Sorry try again later.", 10);
        setActionLoader(false);
      });
  };

  return (
    <Content style={{ overflow: "initial" }}>
      <Card style={{ marginBottom: "16px" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <VerticalAlignMiddleOutlined />
            <span>Integrations</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card
        style={{ marginBottom: "24px" }}
        type="inner"
        title="Manage Integrations"
        extra={<Link to={INTEGRATIONS_ADD}>Add New</Link>}
      >
        {loading ? (
          <Spin></Spin>
        ) : (
          <Spin spinning={actionLoader}>
            <Table
              columns={getColumn(model, setModel, updateStatus, deleteProject)}
              dataSource={integrations}
            />
          </Spin>
        )}
        {model.visable && <EditProject />}
      </Card>
    </Content>
  );
};

export default ManageIntegrations;
