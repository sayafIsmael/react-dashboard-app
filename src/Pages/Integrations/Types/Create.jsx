import React, { useState } from "react";
import {
  Drawer,
  Switch,
  Form,
  Input,
  Button,
  Spin,
  message,
  Space,
} from "antd";

import { Setting } from "../../../Utils/Settings";
import { loadingIcon } from "../../../Component/Common/LoadinIcon";
import { useContext } from "react";
import TypesContext from "../../../Context/Integration/typesContext";
import { Axios } from "../../../Utils/Axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 8,
    },
  },
};
const CreateTypes = (props) => {
  const { setTypes } = useContext(TypesContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    Axios.post(
      `${Setting.api_base_url}/integration/services/service-type/create`,
      formData
    )
      .then((res) => {
        if (res.data.status) {
          message.success(
            "Hurrah! Types successfully created! Now you can manage by going to the manage page",
            10
          );

          setTypes((prev) => [...prev, res.data.data]);
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

  return (
    <>
      <Drawer
        title={`Add Integration Types`}
        width={720}
        onClose={() => props.action((prev) => !prev)}
        visible={true}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => props.action((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              onClick={() => props.action((prev) => !prev)}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          {...formItemLayout}
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
          <Form.Item name="status" label="Status" initialValue={false}>
            <Switch />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
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
      </Drawer>
    </>
  );
};

export default CreateTypes;
