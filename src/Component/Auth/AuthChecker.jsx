import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as RouteLink from "../../Utils/Route";

const AuthChecker = ({ component: Component, authStatus, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authStatus === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: RouteLink.LOGIN_ROUTE,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthChecker;
