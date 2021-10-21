import React, { useEffect } from "react";
import { useState } from "react";
import { message } from "antd";
import { Axios } from "../../Utils/Axios";
import { Setting } from "../../Utils/Settings";

const CategoryContext = React.createContext();

export const IntegrationCategoriesProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState({ visable: false, data: {} });

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `${Setting.api_base_url}/integration/services/service-category/list`
    )
      .then((res) => {
        if (res.data.status) {
          setCategories(res.data.data);
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
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        loading,
        model,
        setModel,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
