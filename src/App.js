import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as RouteLink from "./Utils/Route";
import Login from "./Pages/Login/Index.jsx";
import NotFound from "./Pages/Notfound/Index";
import AuthChecker from "./Component/Auth/AuthChecker";
import Layout from "./Component/Layout/Index";

function App() {
  const [appStatus, setAppStatus] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const jwtToken = await localStorage.getItem("access_token");

      if (jwtToken === null) {
        setAuthStatus(false);
      } else {
        setAuthStatus(true);
      }
      setTimeout(() => setAppStatus(true), 100);
    };
    checkAuth();
  }, []);

  return appStatus ? (
    <React.Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin color="secondary" size="large" />
        </div>
      }
    >
      <Router>
        <Switch>
          <Route path={RouteLink.LOGIN_ROUTE}>
            <Login />
          </Route>
          <Route path="/">
            <AuthChecker component={Layout} authStatus={authStatus} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  ) : (
    <div
      className="blank_progress_container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin color="secondary" size="large" />
    </div>
  );
}

export default App;
