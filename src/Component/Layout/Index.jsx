import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SideBar from "../Sidebar/Index";

//utils import
import * as RouteLink from "../../Utils/Route";
import HeaderComponent from "../Header/Index";

import { ProjectProvider } from "../../Context/projectsContext";
import { IntegrationProvider } from "../../Context/integrationContext";
import { IntegrationTypesProvider } from "../../Context/Integration/typesContext";
import { IntegrationCategoriesProvider } from "../../Context/Integration/categoriesContext";

//file import
const Dashboard = lazy(() => import("../../Pages/Dashboard/Index"));
const Project = lazy(() => import("../../Pages/Projects/Index"));
const CreateProject = lazy(() => import("../../Pages/Projects/Create/Index"));
const IntegrationTypes = lazy(() =>
  import("../../Pages/Integrations/Types/Index")
);
const ManageIntegrationCategories = lazy(() =>
  import("../../Pages/Integrations/Categories/Index")
);
const CreateIntegration = lazy(() => import("../../Pages/Integrations/Create"));

const ManageIntegrations = lazy(() => import("../../Pages/Integrations/Index"));

const NotFound = lazy(() => import("../../Pages/Notfound/Index"));

const LayoutWrapper = (props) => {
  return (
    <ProjectProvider>
      <IntegrationProvider>
        <IntegrationTypesProvider>
          <IntegrationCategoriesProvider>
            <Layout style={{ height: "100%" }}>
              <HeaderComponent />
              <Layout>
                <SideBar />
                <Layout style={{ padding: "24px 24px", overflow: "auto" }}>
                  <Switch>
                    <Route exact path={RouteLink.DASHBOARD_ROUTE}>
                      <Dashboard />
                    </Route>
                    <Route exact path={RouteLink.MANAGE_SOFTWARE_ROUTE}>
                      <Project />
                    </Route>
                    <Route exact path={RouteLink.ADD_SOFTWARE_ROUTE}>
                      <CreateProject />
                    </Route>
                    <Route exact path={RouteLink.INTEGRATIONS_TYPES}>
                      <IntegrationTypes />
                    </Route>
                    <Route exact path={RouteLink.INTEGRATIONS_CATEGORY}>
                      <ManageIntegrationCategories />
                    </Route>
                    <Route exact path={RouteLink.INTEGRATIONS_ROUTE}>
                      <ManageIntegrations />
                    </Route>
                    <Route exact path={RouteLink.INTEGRATIONS_ADD}>
                      <CreateIntegration />
                    </Route>
                    <Route>
                      <NotFound />
                    </Route>
                  </Switch>
                </Layout>
              </Layout>
            </Layout>
          </IntegrationCategoriesProvider>
        </IntegrationTypesProvider>
      </IntegrationProvider>
    </ProjectProvider>
  );
};

export default LayoutWrapper;
