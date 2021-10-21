import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Switch,
  Spin,
  Upload,
} from "antd";

import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

import { MANAGE_SOFTWARE_ROUTE } from "../../../Utils/Route";
import BreadcrumbComponent from "./Breadcrumb";
import { Setting } from "../../../Utils/Settings";
import { Axios } from "../../../Utils/Axios";
import { loadingIcon } from "../../../Component/Common/LoadinIcon";
import ProjectContext from "../../../Context/projectsContext";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Content } = Layout;

const CreateProject = () => {
  const { setProjects } = useContext(ProjectContext);

  const [form] = Form.useForm();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "logo") formData.append(key, values[key]);
    });
    if (values.logo) formData.append("logo", logo, logo.name);

    Axios.post(`${Setting.api_base_url}/project/create`, formData)
      .then((res) => {
        if (res.data.status) {
          message.success(
            "Hurrah! Project successfully added! Now you can manage by going to the manage page",
            10
          );

          console.log(res.data.data);

          setProjects((prev) => [...prev, res.data.data]);
          form.resetFields();
        } else {
          message.error(res.data.error.message, 10);
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed! Sorry try again later.", 10);
        console.log(err);
        setLoading(false);
      });
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  return (
    <Content style={{ overflow: "initial" }}>
      <BreadcrumbComponent />
      <Card
        style={{ marginBottom: "24px" }}
        type="inner"
        title="Create Project"
        extra={<Link to={MANAGE_SOFTWARE_ROUTE}>Manage</Link>}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Form
              {...layout}
              form={form}
              layout="horizontal"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true }, { type: "string", min: 2 }]}
              >
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item
                name="url"
                label="Domain"
                rules={[
                  { required: true },
                  { type: "string", min: 4 },
                  { type: "url" },
                ]}
              >
                <Input placeholder="url" />
              </Form.Item>
              <Form.Item name="status" label="Status" initialValue={false}>
                <Switch />
              </Form.Item>
              <Form.Item
                name="integration"
                label="Integration"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
              <Form.Item name="followup" label="Followup" initialValue={false}>
                <Switch />
              </Form.Item>
              <Form.Item name="tagging" label="Tagging" initialValue={false}>
                <Switch />
              </Form.Item>
              <Form.Item name="roadmap" label="Roadmap" initialValue={false}>
                <Switch />
              </Form.Item>
              <Form.Item
                name="logo"
                label="Logo"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please full this!",
                  },
                ]}
              >
                <Upload
                  maxCount={1}
                  name="logo"
                  listType="picture"
                  beforeUpload={(file) => {
                    setLogo(file);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to select</Button>
                </Upload>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  style={{ minWidth: 120 }}
                >
                  {loading ? <Spin indicator={loadingIcon} /> : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Card>
    </Content>
  );
};

export default CreateProject;
