import React, { useContext, useState } from "react";
import { Card, Layout, Table, Spin, message, Button } from "antd";
import CategoryContext from "../../../Context/Integration/categoriesContext";
import { getColumn } from "./column";
import { Axios } from "../../../Utils/Axios";
import { Setting } from "../../../Utils/Settings";
import BreadcrumbComponent from "./BreadCrumb";
import EditCategory from "./Edit";
import CreateCategory from "./Create";
const { Content } = Layout;

const ManageIntegrationCategories = () => {
  const { loading, categories, setCategories, model, setModel } =
    useContext(CategoryContext);

  const [actionLoader, setActionLoader] = useState(false);
  const [createModel, setCreateModel] = useState(false);

  const updateStatus = (record, value) => {
    setActionLoader(true);
    Axios.post(
      `${Setting.api_base_url}/integration/services/service-category/update`,
      {
        data: { _id: record._id, status: value },
      }
    )
      .then((res) => {
        const updatedData = categories.map((obj) => {
          if (obj._id === record._id) {
            return res.data.data;
          } else {
            return obj;
          }
        });
        setCategories(updatedData);
        message.success("Hurrah! Category successfully updated!", 10);
        setActionLoader(false);
      })
      .catch((err) => {
        message.error("Failed! Sorry try again later.", 10);
        setActionLoader(false);
      });
  };

  const deleteProject = (record) => {
    setActionLoader(true);
    Axios.post(
      `${Setting.api_base_url}/integration/services/service-category/delete`,
      {
        data: { _id: record._id },
      }
    )
      .then((res) => {
        setCategories((prev) =>
          prev.filter((project) => project._id !== record._id)
        );
        message.success("Hurrah! Category successfully deleted!", 10);
        setActionLoader(false);
      })
      .catch((err) => {
        message.error("Failed! Sorry try again later.", 10);
        setActionLoader(false);
      });
  };

  return (
    <Content style={{ overflow: "initial" }}>
      <BreadcrumbComponent />
      <Card
        style={{ marginBottom: "24px" }}
        type="inner"
        title="Manage Categories"
        extra={
          <Button onClick={() => setCreateModel((prev) => !prev)}>
            Add new
          </Button>
        }
      >
        {loading ? (
          <Spin></Spin>
        ) : (
          <Spin spinning={actionLoader}>
            <Table
              columns={getColumn(model, setModel, updateStatus, deleteProject)}
              dataSource={categories}
            />
          </Spin>
        )}
        {model.visable && <EditCategory />}
        {createModel && <CreateCategory action={setCreateModel} />}
      </Card>
    </Content>
  );
};

export default ManageIntegrationCategories;
