import React from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Layout, Avatar } from "antd";

//ANT
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/">My Account</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/">My Projects</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

const HeaderComponent = (props) => {
  return (
    <Header
      className="header"
      style={{
        padding: "0px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src={"https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png"}
          alt=""
          style={{ width: "160px", height: "55px", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BellOutlined
          style={{ color: "#fff", fontSize: "22px", marginRight: "16px" }}
          size={24}
        />
        <Dropdown overlay={menu} trigger={["click"]}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            href="/"
          >
            <Avatar size={24} icon={<UserOutlined />} style={{ flex: "end" }} />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
