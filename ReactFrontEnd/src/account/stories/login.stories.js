import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import LoginComponent from "../components/loginForm"

  storiesOf("Login form", module)
    .add('empty', () => <LoginComponent {...{ login: "", password: "", loading: false }} cancel={() => {}} />)
    .add('with login', () => <LoginComponent {...{ login: "arbor", password: "", loading: false }} cancel={() => {}} />)
    .add('with login 2', () => <LoginComponent {...{ login: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", loading: false }} cancel={() => {}} />)
    .add('with login and password', () => <LoginComponent {...{ login: "arbor", password: "some password", loading: false }} cancel={() => {}} />)
    .add('submited', () => <LoginComponent {...{ login: "arbor", password: "some password", loading: true }} cancel={() => {}} />)
    .add('with error', () => <LoginComponent {...{ login: "arbor", password: "some password", loading: false, error: "some error to display" }} cancel={() => {}} />);