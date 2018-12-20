import * as React from "react";
import { Card, Table, Button, Input } from "antd";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { loadUsers } from "bx-services/users";
import CreateUser from "./create";
import EditUser from "./edit";

interface IUserListState {
  loading: boolean;
  list: Areas.Account.IUser[];
}

export default class UserList extends React.PureComponent<
  RouteComponentProps,
  IUserListState
> {
  columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
         <div className="custom-filter-dropdown">
          <Input ref={item => { if(item !== null) { item.focus(); } }} placeholder="Search by login" onPressEnter={() => {confirm();}} />
         </div>
        );
      }
    },
    {
      title: "",
      key: "action",
      render: (text, record: Areas.Account.IUser) => {
        return (
          <Button
            onClick={() => {
              this.props.history.push(`/account/list/edit/${record.id}`);
            }}
          >
            Edit
          </Button>
        );
      }
    }
  ];
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

    loadUsers().then(list => {
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
          <Table
            loading={this.state.loading}
            dataSource={this.state.list}
            columns={this.columns}
          />
        </Card>
        <Route path="/account/list/create" component={CreateUser} />
        <Route path="/account/list/edit/:id" component={EditUser} />
      </div>
    );
  }
}
