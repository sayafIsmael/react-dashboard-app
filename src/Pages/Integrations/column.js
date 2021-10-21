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
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => {
        if (logo) {
          let src = `data:image/"${
            logo.contentType
          };base64,${logo.data.toString()}`;
          return (
            <img
              src={src}
              height={50}
              width={50}
              alt=""
              style={{ objectFit: "contain" }}
            />
          );
        } else {
          return <img alt="" />;
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/">{text}</a>,
    },

    {
      title: "URL",
      dataIndex: "url",
      key: "url",
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
      title: "Permissions",
      key: "permissions",
      dataIndex: "permissions",
      render: (permissions) => (
        <>
          {permissions.map((permission) => {
            let color = permission.value ? "green" : "red";
            return (
              <Tag color={color} key={Math.random()}>
                {permission.field}
              </Tag>
            );
          })}
        </>
      ),
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
