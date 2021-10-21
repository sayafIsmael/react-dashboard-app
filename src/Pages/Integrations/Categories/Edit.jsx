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
  Select,
} from "antd";

import { Setting } from "../../../Utils/Settings";
import { loadingIcon } from "../../../Component/Common/LoadinIcon";
import { useContext } from "react";
import TypesContext from "../../../Context/Integration/typesContext";
import CategoryContext from "../../../Context/Integration/categoriesContext";
import { Axios } from "../../../Utils/Axios";

const { Option } = Select;

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
const EditCategory = (props) => {
  const { types } = useContext(TypesContext);
  const { model, setModel, categories, setCategories } =
    useContext(CategoryContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log(values.typeId, model.data);

    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "typeId") formData.append(key, values[key]);
      if (key === "typeId")
        formData.append(
          key,
          values.typeId === undefined
            ? model.data.typeDoc._id
            : values.typeId.value
        );
    });

    formData.append("_id", model.data._id);

    Axios.post(
      `${Setting.api_base_url}/integration/services/service-category/update`,
      formData
    )
      .then((res) => {
        if (res.data.status) {
          message.success(
            "Hurrah! Category successfully updated! Now you can manage by going to the manage page",
            10
          );
          const updatedData = categories.map((obj) => {
            if (obj._id === model.data._id) {
              return res.data.data;
            } else return obj;
          });

          setCategories(updatedData);
        } else {
          message.error(res.data.error.message, 10);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Failed! Sorry try again later.", 10);
        console.log(err);
      });
  };

  return (
    <>
      <Drawer
        title={`Edit ${model.data.name} deatils`}
        width={720}
        onClose={() =>
          setModel((prev) => ({ ...prev, visable: !prev.visable }))
        }
        visible={model.visable}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={() =>
                setModel((prev) => ({ ...prev, visable: !prev.visable }))
              }
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                setModel((prev) => ({ ...prev, visable: !prev.visable }))
              }
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
          <Form.Item name="typeId" label="Types">
            <Select
              labelInValue
              defaultValue={{ value: model.data.typeDoc._id.toString() }}
            >
              {types.length !== 0 &&
                types.map((op) => (
                  <Option value={op._id.toString()} key={op._id.toString()}>
                    {op.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            initialValue={model.data.name}
            rules={[{ required: true }, { type: "string", min: 2 }]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            initialValue={model.data.status}
          >
            <Switch defaultChecked={model.data.status} />
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

export default EditCategory;
