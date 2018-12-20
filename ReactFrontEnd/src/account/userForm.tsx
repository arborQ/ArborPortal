import * as React from "react";
import {useState} from "react";
import {Form, Input, Switch } from "antd";

export interface IUserFormProps {
    userData: Areas.Account.IUser;
    updateUserData: (partialData: Partial<Areas.Account.IUser>) => void;
}

export default function (props: IUserFormProps) {
    return (
        <div>
            <Form.Item>
                <Input
                    placeholder="Email address"
                    value={props.userData.email}
                    onChange={e => {
                        props.updateUserData({ email: e.target.value });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    placeholder="Login"
                    value={props.userData.login}
                    onChange={e => {
                        props.updateUserData({ login: e.target.value });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    placeholder="First Name"
                    value={props.userData.firstName}
                    onChange={e => {
                        props.updateUserData({ firstName: e.target.value });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    placeholder="Last Name"
                    value={props.userData.lastName}
                    onChange={e => {
                        props.updateUserData({ lastName: e.target.value });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Switch checkedChildren="Active" unCheckedChildren="Not Active" defaultChecked={props.userData.isActive} onChange={(isActive) => {
                    props.updateUserData({
                        isActive
                    });
                }} />
            </Form.Item>
        </div>
    );
}