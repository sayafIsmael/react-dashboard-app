import React, { useState, useContext } from "react";
import {
  Button,
  Checkbox,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Switch,
  Spin,
  Select,
  Radio,
  Upload,
} from "antd";

import { Link } from "react-router-dom";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { INTEGRATIONS_ROUTE } from "../../Utils/Route";
import BreadcrumbComponent from "./BreadCrumb";
import { Setting } from "../../Utils/Settings";
import { Axios } from "../../Utils/Axios";
import { loadingIcon } from "../../Component/Common/LoadinIcon";
import ProjectContext from "../../Context/projectsContext";
import CategoryContext from "../../Context/Integration/categoriesContext";
const { Option } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Content } = Layout;

const CreateIntegration = () => {
  const { setProjects } = useContext(ProjectContext);
  const { categories } = useContext(CategoryContext);

  const [form] = Form.useForm();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dynamicFormTyep, setDynamicFromType] = useState(1);

  const onFinish = (values) => {
    console.log(values);

    // setLoading(true);

    // const formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //   if (key !== "logo") formData.append(key, values[key]);
    // });
    // if (values.logo) formData.append("logo", logo, logo.name);

    // Axios.post(`${Setting.api_base_url}/project/create`, formData)
    //   .then((res) => {
    //     if (res.data.status) {
    //       message.success(
    //         "Hurrah! Project successfully added! Now you can manage by going to the manage page",
    //         10
    //       );

    //       console.log(res.data.data);

    //       setProjects((prev) => [...prev, res.data.data]);
    //       form.resetFields();
    //     } else {
    //       message.error(res.data.error.message, 10);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     message.error("Failed! Sorry try again later.", 10);
    //     console.log(err);
    //     setLoading(false);
    //   });
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 24 },
  };

  const typeChangeHandle = (value) => {};

  return (
    <Content style={{ overflow: "initial" }}>
      <BreadcrumbComponent />
      <Card
        style={{ marginBottom: "24px" }}
        type="inner"
        title="Create Integration"
        extra={<Link to={INTEGRATIONS_ROUTE}>Manage</Link>}
      >
        <Row>
          <Col span={12}>
            <Form
              {...layout}
              form={form}
              layout="vertical"
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
              <Form.Item name="specefic_integration">
                <Checkbox onChange={typeChangeHandle} defaultChecked={false}>
                  Specific Integration
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Select>
                  {categories.length !== 0 &&
                    categories.map((op) => (
                      <Option value={op._id}>{op.name}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="service_url"
                label="Domain"
                rules={[
                  { required: true, message: "Service url is required" },
                  { type: "url" },
                ]}
              >
                <Input placeholder="Service URL" />
              </Form.Item>
              <Form.Item
                name="api_base_url"
                label="API Base Url"
                rules={[
                  { required: true, message: "API base URL is required" },
                  { type: "url" },
                ]}
              >
                <Input placeholder="API Base Url" />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <h4>API Form Setup</h4>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <Radio.Group
                      onChange={(e) => setDynamicFromType(e.target.value)}
                      value={dynamicFormTyep}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Radio value={1}>Form</Radio>
                      <Radio value={2}>URL Redirect</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {dynamicFormTyep === 1 ? (
                    <Form.List name="fields">
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item required={false} key={field.key}>
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input passenger' name or delete this field.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Input Field Name"
                                  style={{ width: "calc(100% - 40px)" }}
                                />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: "calc(100% - 40px)" }}
                              icon={<PlusOutlined />}
                            >
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <Form.Item>
                      <Input placeholder="Redirect URL" />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              {...layout}
              form={form}
              layout="horizontal"
              onFinish={onFinish}
              autoComplete="off"
            >
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
        </Row>
      </Card>
    </Content>
  );
};

export default CreateIntegration;
