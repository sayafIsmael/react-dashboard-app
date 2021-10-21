import React, { useState } from "react";
import {
  Drawer,
  Switch,
  Form,
  Input,
  Button,
  Upload,
  Spin,
  message,
  Space,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { Setting } from "../../../Utils/Settings";
import { loadingIcon } from "../../../Component/Common/LoadinIcon";
import { useContext } from "react";
import ProjectContext from "../../../Context/projectsContext";
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

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditProject = (props) => {
  const { model, setModel, projects, setProjects } = useContext(ProjectContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: `data:image/"${
        model.data.logo.contentType
      };base64,${model.data.logo.data.toString()}`,
    },
  ]);

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "logo") formData.append(key, values[key]);
    });
    if (values.logo) formData.append("logo", fileList[0], fileList[0].name);

    formData.append("_id", model.data._id);

    Axios.post(`${Setting.api_base_url}/project/update`, formData)
      .then((res) => {
        if (res.data.status) {
          message.success(
            "Hurrah! Project successfully updated! Now you can manage by going to the manage page",
            10
          );
          const updatedData = projects.map((obj) => {
            if (obj._id === model.data._id) {
              return res.data.data;
            } else return obj;
          });

          setProjects(updatedData);
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
          <Form.Item
            name="name"
            label="Name"
            initialValue={model.data.name}
            rules={[{ required: true }, { type: "string", min: 2 }]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name="url"
            label="Domain"
            initialValue={model.data.url}
            rules={[
              { required: true },
              { type: "string", min: 4 },
              { type: "url" },
            ]}
          >
            <Input placeholder="url" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            initialValue={model.data.status}
          >
            <Switch defaultChecked={model.data.status} />
          </Form.Item>
          <Form.Item
            name="integration"
            label="Integration"
            initialValue={model.data.integration}
          >
            <Switch defaultChecked={model.data.integration} />
          </Form.Item>
          <Form.Item
            name="followup"
            label="Followup"
            initialValue={model.data.followup}
          >
            <Switch defaultChecked={model.data.followup} />
          </Form.Item>
          <Form.Item
            name="tagging"
            label="Tagging"
            initialValue={model.data.tagging}
          >
            <Switch defaultChecked={model.data.tagging} />
          </Form.Item>
          <Form.Item
            name="roadmap"
            label="Roadmap"
            initialValue={model.data.roadmap}
          >
            <Switch defaultChecked={model.data.roadmap} />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
            getValueFromEvent={normFile}
            rules={[
              {
                required: fileList.length === 0 ? true : false,
                message: "Please fill this!",
              },
            ]}
          >
            <Upload
              maxCount={1}
              name="logo"
              listType="picture"
              initialValue={fileList}
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to select</Button>
            </Upload>
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

export default EditProject;
