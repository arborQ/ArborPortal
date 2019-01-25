import * as React from "react";
import { lazy, Suspense } from "react";
import { Layout, Menu, Icon } from "antd";
import { Route, Link } from "react-router-dom";
// import LoginComponent from "./account/login";
// import CreateUser from "./account/create";
import UserList from "./account/list";
import { withRouter, RouteComponentProps } from "react-router";
import "antd/dist/antd.css";
import { RecipesRoutes } from "./recipes/recipes.index";

const LoginComponent = lazy(() => import("./account/login"));
const CreateUser =  lazy(() => import("./account/create"));
const LazyComponent =  lazy(() => import("./lazy/lazy.index"));

class ReactApplication extends React.PureComponent<RouteComponentProps> {
  render(): JSX.Element {
    return (
      <Layout>
        <Layout.Header>React + Webpack</Layout.Header>
        <Layout>
          <Layout.Sider theme={"light"} breakpoint={"sm"}>
            <Menu
              key={this.props.location.pathname}
              defaultSelectedKeys={[this.props.location.pathname]}
            >
              <Menu.ItemGroup key="g1" title="Unauthorized">
                <Menu.Item key="/recipes">
                  <Link to="/recipes">
                    <Icon type="book" />
                    Recipes
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          </Layout.Sider>
          <Layout.Content style={{ padding: 10 }}>
            <RecipesRoutes />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ReactApplication);
