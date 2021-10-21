import { Button, Popconfirm, Tag, Space, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const getColumn = (
  visiable,
  setModelVis,
  updateStatus,
  deleteProject
) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/">{text}</a>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Type",
      key: "typeDoc",
      dataIndex: "typeDoc",
      render: (typeDoc) => typeDoc.name,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Switch
            defaultChecked={record.status}
            onChange={(value) => updateStatus(record, value)}
          />
          <Button
            type="primary"
            onClick={() => {
              setModelVis((prev) => ({
                ...prev,
                visable: !prev.visable,
                data: record,
              }));
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProject(record)}
          >
            <Button type="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
