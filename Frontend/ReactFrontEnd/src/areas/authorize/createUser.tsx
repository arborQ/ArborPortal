import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LoginButton from '@bx-components/login.button';
import AsyncButton from '@bx-components/async.button.component';
import { useTranslation } from 'react-i18next';
import { post } from '@bx-utils/ajax';
import AuthorizeContext from '@bx-contexts/authorize.context';
import FormComponent from '@bx-components/form.consumer';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router';

interface ICreateUserProps extends RouteChildrenProps {

}

function createUserAction(): Promise<ILoginResponse> {
    return post('/api/users', {});
}

interface ILoginResponse {
    isSuccessfull: boolean;
    token: string | null;
}

export default withRouter(
    function CreateUserComponent({ history }: ICreateUserProps): JSX.Element {
        const { t } = useTranslation();

        const userNameTranslation = t('User Name');
        const emailTranslation = t('Email');
        const saveTranslation = t('Save');
        const passwordTranslation = t('Password');
        const cancelTranslation = t('Cancel');

        const [userData, changeUserData] = React.useState({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        });

        return (
            <FormComponent onSubmit={async () => {
                await createUserAction();
            }}>
                {
                    value => (
                        <Card>
                            <CardContent>
                                <TextField
                                    id='username'
                                    label={userNameTranslation}
                                    value={userData.username}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    onChange={async (e) => {
                                        changeUserData({ ...userData, username: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='email'
                                    label={emailTranslation}
                                    value={userData.email}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    onChange={async (e) => {
                                        changeUserData({ ...userData, email: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='password'
                                    label={passwordTranslation}
                                    value={userData.password}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    type='password'
                                    onChange={async (e) => {
                                        changeUserData({ ...userData, password: e.target.value });
                                    }}
                                />
                                <TextField
                                    id='password'
                                    label={passwordTranslation}
                                    value={userData.confirmPassword}
                                    fullWidth
                                    disabled={value.isLoading}
                                    margin='normal'
                                    type='password'
                                    onChange={async (e) => {
                                        changeUserData({ ...userData, confirmPassword: e.target.value });
                                    }}
                                />
                            </CardContent>
                            <CardActions>
                                <AsyncButton
                                    type='submit'
                                    variant='contained'
                                    loading={value.isLoading}
                                    color='primary'>
                                    {saveTranslation}
                                </AsyncButton>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    disabled={value.isLoading}
                                    onClick={() => history.push('/')}
                                >
                                    {cancelTranslation}
                                </Button>
                            </CardActions>
                        </Card>
                    )}
            </FormComponent>
        );
    });
