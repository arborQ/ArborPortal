import * as React from "react";
import { Alert, Drawer, Form, Input, Icon, Button, Popconfirm } from "antd";
import { RouteComponentProps } from "react-router";
import { login as AuthorizeUser } from "bx-services/account";
import LoginForm from "./components/loginForm";

export default class Login extends React.PureComponent<
  RouteComponentProps,
  Areas.Account.ILoginState
> {
  componentWillMount(): void {
    this.setState({
      ...this.state,
      ...{
        loading: false,
        login: "",
        password: ""
      }
    });
  }

  componentDidMount(): void {
    if (!this.props.location.hash) {
      
    }
  }

  authorize(): void {
    AuthorizeUser().then(() => {
      alert("done");
    });
  }

  render() {
    return <div><button onClick={this.authorize.bind(this)}>Login</button></div>;
  }
}
