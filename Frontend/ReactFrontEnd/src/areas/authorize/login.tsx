import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import { ensureNavigationDecorator, INavigationProps } from '@bx-utils/decorators/ensureNavigationDecorator';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import { dialogDecorator, IDialogProps } from '@bx-utils/decorators/dialogDecorator';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';
import StateComponent from '@bx-utils/stateComponent';
import { editUser } from '@bx-services/users';
import LoginButton from '@bx-components/login.button';
import AsyncButton from '@bx-components/async.button.component';
import { useTranslation } from 'react-i18next';
import { post } from '@bx-utils/ajax';
import AuthorizeContext from '@bx-contexts/authorize.context';

interface ILoginProps extends ITranslationsProps {

}

function authorizeAction(userName: string, password: string): Promise<boolean> {
    return post('/api/authorize/login', { userName, password });
}

export default ensureTranslationsDecorator<ILoginProps>({ namespace: 'login' })(
    function LoginComponent({ translate }: ILoginProps): JSX.Element {
        const { t } = useTranslation();

        const userNameTranslation = t('User Name');
        const passwordTranslation = t('Password');
        const loginButtonTranslation = t('Login');
        const externalLoginButtonTranslation = t('External provider login');

        const [loginData, changeLoginData] = React.useState({ username: '', password: '', rememverMe: false });

        return (
            <AuthorizeContext.Consumer>
                {
                    context => (
                        <form onSubmit={(e) => { e.preventDefault(); }}>
                            <Card>
                                <CardContent>
                                    <TextField
                                        id='username'
                                        label={userNameTranslation}
                                        value={loginData.username}
                                        fullWidth
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
                                        color='primary'
                                        onClick={
                                            () => context.changeAuthorize(true)} >
                                        {loginButtonTranslation}
                                    </AsyncButton>
                                    <LoginButton color='primary' type='button'>
                                        {externalLoginButtonTranslation}
                                    </LoginButton>
                                </CardActions>
                            </Card>
                        </form>
                    )
                }
            </AuthorizeContext.Consumer>);
    });
