import * as React from "react";
import { Card, Table, Button, Input, Popconfirm } from "antd";

const columns = [
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
          <Button.Group>
            <Button
              onClick={() => {
                this.props.history.push(`/account/list/edit/${record.id}`);
              }}
            >
              Edit
            </Button>
            <Popconfirm
                    title={`Are you sure you want to remove ${record.firstName} ${record.lastName}?`}
                    onConfirm={() => { if (!!record.id) {this.removeUser(record.id);} }}
                    okText="Yes"
                    cancelText="No"
                  >
            <Button>Remove</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    }
  ];

export default function(state: any): JSX.Element {
    return (
        <Table
            loading={state.loading}
            dataSource={state.list}
            columns={columns}
          />
    );
}