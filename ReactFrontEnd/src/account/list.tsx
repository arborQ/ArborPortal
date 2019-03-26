import * as React from "react";
import { Card, Table, Button, Input, Popconfirm } from "antd";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { loadUsers, deleteUser } from "bx-services/users";
import CreateUser from "./create";
import EditUser from "./edit";

import UserListComponent from "./components/userList";

export default class UserList extends React.PureComponent<
  RouteComponentProps,
  Areas.Account.IUserListProps
> {
  
  componentWillReceiveProps(n: RouteComponentProps) {
    const oldPath = this.props.location.pathname;
    const newPath = n.location.pathname;

    if (newPath !== oldPath && oldPath.indexOf(newPath) === 0) {
      this.componentDidMount();
    }
  }
  componentWillMount(): void {
    this.setState({ loading: false, list: [] });
  }
  componentDidMount(): void {
    this.setState({
      ...this.state,
      loading: true
    });

    loadUsers({ page: 1 }).then(list => {
      this.setState({
        ...this.state,
        loading: false,
        list
      });
    });
  }
  render() {
    return (
      <div>
        <Card title="List of users">
          <UserListComponent
            loading={this.state.loading}
            list={this.state.list}
            onFilterChanged={filter => {
              this.props.history.replace(`/users?login=${filter.loginSearch}`);
            }}
          />
        </Card>
        <Route path="/account/list/create" component={CreateUser} />
        <Route path="/account/list/edit/:id" component={EditUser} />
      </div>
    );
  }

  private removeUser(userId: number): void {
    deleteUser(userId).then(() => { alert('deleted'); });
  }
}
