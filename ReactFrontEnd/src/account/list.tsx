import * as React from "react";
import { Card, Table, Button, Input, Popconfirm } from "antd";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { loadUsers, deleteUser } from "bx-services/users";
import CreateUser from "./create";
import EditUser from "./edit";

import UserListComponent from "./components/userList";

export default class UserList extends React.PureComponent<
  RouteComponentProps<Areas.Account.IUserListProps>,
  Areas.Account.IUserListState
> {
  
  componentWillReceiveProps(n: RouteComponentProps) {
    const oldPath = this.props.location.pathname;
    const newPath = n.location.pathname;

    if (newPath !== oldPath && oldPath.indexOf(newPath) === 0) {
      this.componentDidMount();
    }

    this.loadData();
  }
  componentWillMount(): void {
    this.setState({ loading: false, list: [] });
  }
  componentDidMount(): void {
    this.setState({
      ...this.state,
      loading: true
    });

    this.loadData();
  }

  loadData(): void {
    console.log("this.props.match.params", this.props.match.params);
    console.log("this.props.location.search", this.props.location.search);
    
    loadUsers({ page: +(this.props.match.params.page || "1"), loginSearch: this.props.match.params.loginSearch }).then(list => {
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
              this.props.history.replace(`/users/${filter.loginSearch}/${filter.page}`);
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
