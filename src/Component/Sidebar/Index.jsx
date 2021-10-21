import React from "react";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  AppstoreAddOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

//const import
import * as RouteLink from "../../Utils/Route";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ collapsed, setCollapsed }) => {
  let history = useHistory();
  const navigateUrl = (route) => {
    history.push(route);
  };

  return (
    <Sider className="site-layout-background" width="250">
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ height: "100%" }}
      >
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          onClick={() => navigateUrl(RouteLink.DASHBOARD_ROUTE)}
        >
          Dashbaord
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<VerticalAlignMiddleOutlined />}
          onClick={() => navigateUrl(RouteLink.MANAGE_SOFTWARE_ROUTE)}
        >
          My Projects
        </Menu.Item>
        <SubMenu
          key="sub2"
          icon={<AppstoreAddOutlined />}
          title="Integration Services"
        >
          {/* <Menu.Item
            key="6"
            onClick={() => navigateUrl(RouteLink.INTEGRATIONS_ADD)}
          >
            Add Service
          </Menu.Item> */}
          <Menu.Item
            key="7"
            onClick={() => navigateUrl(RouteLink.INTEGRATIONS_ROUTE)}
          >
            List of Integrations
          </Menu.Item>
          <Menu.Item
            key="9"
            onClick={() => navigateUrl(RouteLink.INTEGRATIONS_CATEGORY)}
          >
            Categories
          </Menu.Item>
          <Menu.Item
            key="8"
            onClick={() => navigateUrl(RouteLink.INTEGRATIONS_TYPES)}
          >
            Types
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
