import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import LoginButton from '@bx-components/login.button';
import AsyncButton from '@bx-components/async.button.component';
import { useTranslation } from 'react-i18next';
import { post } from '@bx-utils/ajax';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { atuhorizeStore } from '@bx-utils/storage';
import FormComponent from '@bx-components/form.consumer';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router';

interface ILoginProps extends ITranslationsProps, RouteChildrenProps {

}

function authorizeAction(login: string, password: string): Promise<ILoginResponse> {
    return post('/api/authorize/login', { login, password });
}

interface ILoginResponse {
    isSuccessfull: boolean;
    token: string | null;
}

const IconButton = styled(Button)`
    .MuiButton-label span {
        display: none;
        padding-right: 1em;
    }

    &:hover {
        .MuiButton-label span {
            display: inline;
        }
    }
`;

export default withRouter(ensureTranslationsDecorator<ILoginProps>({ namespace: 'login' })(
    function LoginComponent({ history }: ILoginProps): JSX.Element {
        const { t } = useTranslation();

        const userNameTranslation = t('User Name');
        const passwordTranslation = t('Password');
        const loginButtonTranslation = t('Login');
        const externalLoginButtonTranslation = t('External provider login');
        const createNewUserTranslation = t('Create new user');
        const [loginData, changeLoginData] = React.useState({ username: '', password: '', rememverMe: false });

        return (
            <AuthorizeContext.Consumer>
                {
                    context => (
                        <FormComponent onSubmit={async () => {
                            const loginResponse = await authorizeAction(loginData.username, loginData.password);
                            const {
                                token, isSuccessfull
                            } = loginResponse;

                            if (isSuccessfull && token !== null) {
                                atuhorizeStore.update({ token });
                                context.changeAuthorize(true);
                            }
                        }}>
                            {
                                value => (
                                    <Card>
                                        <CardContent>
                                            <TextField
                                                id='username'
                                                label={userNameTranslation}
                                                value={loginData.username}
                                                fullWidth
                                                disabled={value.isLoading}
                                                margin='normal'
                                                onChange={async (e) => {
                                                    changeLoginData({ ...loginData, username: e.target.value });
                                                }}
                                            />
                                            <TextField
                                                id='password'
                                                label={passwordTranslation}
                                                value={loginData.password}
                                                fullWidth
                                                type='password'
                                                disabled={value.isLoading}
                                                margin='normal'
                                                onChange={async (e) => {
                                                    changeLoginData({ ...loginData, password: e.target.value });
                                                }}
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <AsyncButton
                                                type='submit'
                                                variant='contained'
                                                loading={value.isLoading}
                                                color='primary'>
                                                {loginButtonTranslation}
                                            </AsyncButton>
                                            <ButtonGroup
                                                variant='outlined'
                                                color='primary'
                                                aria-label='split button'>
                                                <LoginButton color='primary' type='button' disabled={value.isLoading}>
                                                    {externalLoginButtonTranslation}
                                                </LoginButton>
                                                <IconButton
                                                    color='primary'
                                                    size='small'
                                                    aria-owns={open ? 'menu-list-grow' : undefined}
                                                    aria-haspopup='true'
                                                    onClick={() => {
                                                        history.push('/authorize/create');
                                                    }}
                                                >
                                                    <span>{createNewUserTranslation}</span>
                                                    <ArrowDropDownIcon />
                                                </IconButton>
                                            </ButtonGroup>

                                        </CardActions>
                                    </Card>
                                )}
                        </FormComponent>
                    )
                }
            </AuthorizeContext.Consumer>);
    }));
