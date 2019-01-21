import React from 'react';

import { storiesOf } from '@storybook/react';

import UserListComponent from "../components/userList"

storiesOf("Users", module)
    .add('empty list', () => <UserListComponent list={[]} />)
    .add('list', () => <UserListComponent list={[{ login: 'arbor' }, { login: 'arbor 2' }]}  />)
    .add('list loading', () => <UserListComponent list={[{ login: 'arbor' }, { login: 'arbor 2' }]} loading={true} />)
    .add('empty list loading', () => <UserListComponent list={[]} loading={true} />);