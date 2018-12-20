import * as React from "react";
import {
  Drawer,
  Form,
  Button,
  Popconfirm,
} from "antd";
import UserForm from "./userForm";

import { RouteComponentProps } from "react-router";
import {  createUser } from "bx-services/users";
interface ICreateUserState {
  loading: boolean;
  userData: Areas.Account.IUser;
}

export default class CreateUser extends React.PureComponent<
  RouteComponentProps<{ id: string }>,
  ICreateUserState
> {
  componentWillMount(): void {
    const userData: Areas.Account.IUser = {
      isActive: true,
      login: "",
      firstName: "",
      lastName: "",
      email: ""
    };

    this.setState({
      loading: false, userData
    });
  }

  render() {
    return (
      <div>
        <Drawer
          visible={true}
          title="Create user"
          placement="left"
          onClose={() => {
            this.props.history.goBack();
          }}
        >
          {this.state.userData === null ? null : (
            <Form onSubmit={this.submitForm.bind(this)}>
              <UserForm
                userData={this.state.userData}
                updateUserData={this.updateUserData.bind(this)}
              />
              <Button.Group>
                <Button htmlType="submit" type="primary">
                  Create
                </Button>
                <Popconfirm
                  title="Are you sure you want to cancel?"
                  onConfirm={this.cancel.bind(this)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="dashed" htmlType="button">
                    Cancel
                  </Button>
                </Popconfirm>
              </Button.Group>
            </Form>
          )}
        </Drawer>
      </div>
    );
  }

  private cancel(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    this.props.history.replace("/account/list");
  }

  private updateUserData(partialData: Partial<Areas.Account.IUser>): void {
    if (this.state.userData === null) {
      return;
    }

    this.setState({
      ...this.state,
      ...{
        userData: {
          ...this.state.userData,
          ...partialData
        }
      }
    });
  }

  private submitForm(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      ...this.state,
      loading: true
    });
    if (this.state.userData !== null) {
      createUser(this.state.userData).then(s => {
        this.setState(
          {
            ...this.state,
            loading: false
          },
          () => {
            this.props.history.push("/account/list");
          }
        );
      });
    }
  }
}
