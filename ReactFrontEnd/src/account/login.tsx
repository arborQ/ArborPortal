import * as React from "react";
import { Alert, Drawer, Form, Input, Icon, Button, Popconfirm } from "antd";
import { RouteComponentProps } from "react-router";
import { login as ValidateUser } from "bx-services/account";
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

  render() {
    return (
      <Drawer
        title="Validate user"
        visible={true}
        style={{ maxWidth: 600 }}
        onClose={this.cancel.bind(this)}
      >
        <Form onSubmit={this.submit.bind(this)}>
          <LoginForm {...this.state} cancel={this.cancel.bind(this)} />
        </Form>
      </Drawer>
    );
  }

  private cancel(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    this.props.history.replace("/account/list");
  }

  private submit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ ...this.state, loading: true });

    ValidateUser(this.state.login, this.state.password)
      .then(response => {
        this.setState({ ...this.state, loading: false });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          error: "Can't authorize",
          loading: false,
        });
      });
  }
}
