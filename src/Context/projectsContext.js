import { message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../Utils/Axios";
import { Setting } from "../Utils/Settings";

const ProjectContext = React.createContext();

export const ProjectProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState({ visable: false, data: {} });

  useEffect(() => {
    setLoading(true);

    Axios.get(`${Setting.api_base_url}/project/list`)
      .then((res) => {
        if (res.data.status) {
          setProjects(res.data.data);
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
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        loading,
        setLoading,
        model,
        setModel,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
