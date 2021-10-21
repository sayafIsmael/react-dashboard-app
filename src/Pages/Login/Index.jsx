import React, { useState } from "react";
import Axios from "axios";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Spin,
} from "antd";
import { LockOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";

//file import
import { style } from "./style";
import { Setting } from "../../Utils/Settings";
import * as RouteLink from "../../Utils/Route";

//global const
const { Title } = Typography;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [result, setResult] = useState({ msg: "", status: false });
  const [loading, setLoading] = useState(false);

  const hasError = formValues.email === "" || formValues.password === "";

  //send and get login access
  const handleLogin = () => {
    setResult((prev) => ({ msg: "", status: false }));

    setLoading(true);
    Axios.post(`${Setting.api_base_url}/auth/admin/signin`, {
      data: formValues,
    })
      .then(async (res) => {
        if (res.data.status) {
          await localStorage.setItem("access_token", res.data.access_token);
          window.location.href = `${RouteLink.DASHBOARD_ROUTE}`;
        } else {
          setResult((prev) => ({
            msg:
              typeof res.data.error === "object"
                ? "Sorry something going wrong"
                : res.data.error,
            status: true,
          }));
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <div style={style.loginContainer}>
      <Row>
        <Col span={8}></Col>
        <Col span={8} style={style.loginColContainer}>
          <div style={style.loginFormController}>
            <img src={style.logoImageSrc} alt="" style={{ height: "180px" }} />
            <Title level={5} style={style.minitext}>
              Global control center admin login page.
            </Title>
            {result.status && (
              <Alert
                style={{ marginBottom: "20px", width: "100%" }}
                message="Error Message"
                description={result.msg}
                type="error"
                closable
                onClose={() => alert("Bal")}
              />
            )}

            <Form style={{ width: "100%" }}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ marginTop: "20px" }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  type="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Item>
              <div style={style.buttonContanier}>
                <Checkbox>Remember me</Checkbox>
              </div>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%", marginTop: "20px" }}
                disabled={hasError || loading ? true : false}
                onClick={handleLogin}
              >
                {loading ? <Spin indicator={loadingIcon} /> : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
};

export default Login;
