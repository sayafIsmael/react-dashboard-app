import { message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../Utils/Axios";
import { Setting } from "../Utils/Settings";

const IntegrationContext = React.createContext();

export const IntegrationProvider = (props) => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState({ visable: false, data: {} });

  useEffect(() => {
    setLoading(true);

    Axios.get(`${Setting.api_base_url}/integration/services/list`)
      .then((res) => {
        if (res.data.status) {
          setIntegrations(res.data.data);
        } else {
          message.error("sorry something went wrong please try again.", 10);
        }

        setLoading(false);
      })
      .catch((err) => {
        message.error("sorry something went wrong please try again.", 10);
        setLoading(false);
      });
  }, []);

  return (
    <IntegrationContext.Provider
      value={{
        integrations,
        setIntegrations,
        loading,
        setLoading,
        model,
        setModel,
      }}
    >
      {props.children}
    </IntegrationContext.Provider>
  );
};

export default IntegrationContext;
