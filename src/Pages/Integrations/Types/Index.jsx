import React, { useContext, useState } from "react";
import { Card, Layout, Table, Spin, message, Button } from "antd";
import TypesContext from "../../../Context/Integration/typesContext";
import { getColumn } from "./column";
import { Axios } from "../../../Utils/Axios";
import { Setting } from "../../../Utils/Settings";
import BreadcrumbComponent from "./BreadCrumb";
import EditTypes from "./Edit";
import CreateTypes from "./Create";
const { Content } = Layout;

const ManageIntegrationTypes = () => {
  const { loading, types, setTypes, model, setModel } =
    useContext(TypesContext);

  const [actionLoader, setActionLoader] = useState(false);
  const [createModel, setCreateModel] = useState(false);

  const updateStatus = (record, value) => {
    setActionLoader(true);
    Axios.post(
      `${Setting.api_base_url}/integration/services/service-type/update`,
      {
        data: { _id: record._id, status: value },
      }
    )
      .then((res) => {
        const updatedData = types.map((obj) => {
          if (obj._id === record._id) {
            return res.data.data;
          } else {
            return obj;
          }
        });
        setTypes(updatedData);
        message.success("Hurrah! Type successfully updated!", 10);
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
      `${Setting.api_base_url}/integration/services/service-type/delete`,
      {
        data: { _id: record._id },
      }
    )
      .then((res) => {
        setTypes((prev) =>
          prev.filter((project) => project._id !== record._id)
        );
        message.success("Hurrah! Type successfully deleted!", 10);
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
        title="Manage Types"
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
              dataSource={types}
            />
          </Spin>
        )}
        {model.visable && <EditTypes />}
        {createModel && <CreateTypes action={setCreateModel} />}
      </Card>
    </Content>
  );
};

export default ManageIntegrationTypes;
