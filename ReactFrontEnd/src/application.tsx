import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import "antd/dist/antd.css";
import { RecipesRoutes } from "./recipes/recipes.index";
import { AccountRoutes, ListUsersPath, CreateUserPath } from "./account/account.index";
import { login as AuthorizeUser, isAuthorized } from "bx-services/account";

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
                    Recipesz
                  </Link>
                </Menu.Item>
                <Menu.Item key={ListUsersPath}>
                  <Link to={ListUsersPath}>
                    <Icon type="team" />
                    Users
                  </Link>
                </Menu.Item>
                <Menu.Item key={CreateUserPath}>
                  <Link to={CreateUserPath}>
                    <Icon type="plus-circle" />
                    Add User
                  </Link>
                </Menu.Item>
                <Menu.Item key={"/login"}>
                  <a onClick={() => { AuthorizeUser().then(a => this.props.history.replace('/recipes')) }}>
                    <Icon type="plus-circle" />
                    Login
                  </a>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          </Layout.Sider>
          <Layout.Content style={{ padding: 10 }}>
            <RecipesRoutes />
            <AccountRoutes />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }

  componentWillMount() : void {
    // isAuthorized().then(result => alert(result))
  }
}

export default withRouter(ReactApplication);
