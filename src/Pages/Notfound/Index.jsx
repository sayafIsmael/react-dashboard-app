import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  let history = useHistory();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: "/dashboard",
              state: { fromDashboard: true },
            })
          }
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
