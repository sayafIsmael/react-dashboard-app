import React, { useContext, useState } from "react";
import { Breadcrumb, Card, Layout, Table, Spin, message } from "antd";
import { HomeOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ADD_SOFTWARE_ROUTE } from "../../Utils/Route";
import ProjectContext from "../../Context/projectsContext";
import { getColumn } from "./column";
import EditProject from "./Edit/Index";
import { Axios } from "../../Utils/Axios";
import { Setting } from "../../Utils/Settings";
const { Content } = Layout;

const ManageSoftware = () => {
  const { projects, setProjects, loading, model, setModel } =
    useContext(ProjectContext);

  const [actionLoader, setActionLoader] = useState(false);

  const updateStatus = (record, value) => {
    setActionLoader(true);
    Axios.post(`${Setting.api_base_url}/project/update`, {
      data: { _id: record._id, status: value },
    })
      .then((res) => {
        const updatedData = projects.map((obj) => {
          if (obj._id === record._id) {
            return res.data.data;
          } else {
            return obj;
          }
        });
        setProjects(updatedData);
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
        setProjects((prev) =>
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
            <span>Projects</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card
        style={{ marginBottom: "24px" }}
        type="inner"
        title="Manage Projects"
        extra={<Link to={ADD_SOFTWARE_ROUTE}>Add New</Link>}
      >
        {loading ? (
          <Spin></Spin>
        ) : (
          <Spin spinning={actionLoader}>
            <Table
              columns={getColumn(model, setModel, updateStatus, deleteProject)}
              dataSource={projects}
            />
          </Spin>
        )}
        {model.visable && <EditProject />}
      </Card>
    </Content>
  );
};

export default ManageSoftware;
