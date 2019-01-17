import * as React from "react";
import { Alert, Form, Input, Icon, Button, Popconfirm } from "antd";

interface ILoginProps extends  Areas.Account.ILoginState {
    cancel: () => void;
}

export default function(state: ILoginProps): JSX.Element {
  return (
    <div>
      {!!state.error ? (
          <Form.Item>
            <Alert
            message={state.error}
            description={state.error}
            type="error"
            />
        </Form.Item>
      ) : null}
      <Form.Item
        help="give email?"
        validateStatus={state.login === "" ? "error" : "success"}
      >
        <Input
          disabled={state.loading}
          prefix={<Icon type="user" />}
          placeholder="Email"
          value={state.login}
          onChange={v => this.setState({ ...state, login: v.target.value })}
        />
      </Form.Item>
      <Form.Item
        help="give passowrd?"
        validateStatus={state.password === "" ? "error" : "success"}
      >
        <Input
          disabled={state.loading}
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={v => this.setState({ ...state, password: v.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button.Group>
          <Button loading={state.loading} type="primary" htmlType="submit">
            Submit
          </Button>
          <Popconfirm
            title="Are you sure you want to cancel?"
            onConfirm={() => state.cancel()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed" htmlType="button">
              Cancel
            </Button>
          </Popconfirm>
        </Button.Group>
      </Form.Item>
    </div>
  );
}
