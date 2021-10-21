import React, { useEffect } from "react";
import { useState } from "react";
import { message } from "antd";
import { Axios } from "../../Utils/Axios";
import { Setting } from "../../Utils/Settings";

const TypesContext = React.createContext();

export const IntegrationTypesProvider = (props) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState({ visable: false, data: {} });

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Setting.api_base_url}/integration/services/service-type/list`)
      .then((res) => {
        if (res.data.status) {
          setTypes(res.data.data);
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
    <TypesContext.Provider
      value={{
        types,
        setTypes,
        loading,
        model,
        setModel,
      }}
    >
      {props.children}
    </TypesContext.Provider>
  );
};

export default TypesContext;
