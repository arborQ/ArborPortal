import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ChangeLanguageButton from './components/change.language.button';
import LogOutButton from './components/logout.button';
import './translations/i18n';
import { isAuthorized as isAuthorizedAction } from '@bx-services/account';
import AuthorizeContext from '@bx-contexts/authorize.context';
import { SnackbarProvider } from 'notistack';
import { hot } from 'react-hot-loader/root';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

async function loadConfig() {
    const dd = await import('./settup.json');
}

loadConfig().then(result => {
    console.log(result);
});

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2C73D2' }, // Purple and green play nicely together.
        secondary: { main: '#008F7A' }, // This is just green.A700 as hex.
        error: { main: '#C34A36' },
    },
});

// const socket = io();
// socket.on('core_user_channel', (msg) => {
//     console.log({ msg });
// });

const StyledNavLink = styled(NavLink)`
    color: #FFF;

    &.selected {
        color: #CCC;
    }
`;

const links = [
    { text: 'Home', path: '/' },
    { text: 'List', path: '/account/users?sortBy=login&sortDirection=asc' },
    { text: 'Recepies', path: '/recipes/list' },
    { text: 'Error', path: '/error' },
];

const anonymousLinks = [
    { text: 'Home', path: '/' },
    { text: 'Login', path: '/authorize/login' },
    { text: 'Recepies', path: '/recipes/list' },
    { text: 'Error', path: '/error' },
];

function Render(): JSX.Element | null {
    const [isAuthorized, changeAuthorize] = React.useState(false);
    const [userStatusChecked, changeuserStatus] = React.useState(false);

    React.useEffect(() => {
        isAuthorizedAction().then(result => {
            changeAuthorize(result);
            changeuserStatus(true);
        });
    }, [isAuthorized]);

    if (!userStatusChecked) {
        return null;
    }

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <AuthorizeContext.Provider value={{ isAuthorized, changeAuthorize }}>
                    <SnackbarProvider maxSnack={5}>
                        <div>
                            <AppBar position='static'>
                                <Toolbar>
                                    {(isAuthorized ? links : anonymousLinks)
                                        .map(l => (
                                            <StyledNavLink
                                                className={'MuiButtonBase-root MuiButton-root MuiButton-text'}
                                                exact={l.path === '/'}
                                                key={l.path}
                                                to={l.path}
                                                activeClassName='selected'>
                                                {l.text}
                                            </StyledNavLink>))}
                                    {!isAuthorized
                                        ? null
                                        : <LogOutButton onUnauthorized={() => changeAuthorize(false)} />
                                    }
                                    <ChangeLanguageButton name={''} />
                                </Toolbar>
                            </AppBar>
                        </div>
                        <Container maxWidth='md'>
                            <React.Suspense fallback={<div>Loading ...</div>}>
                                <CardContent >
                                    <Switch>
                                        <Route path='/' exact component={React.lazy(() => import('./lazy/home'))} />
                                        <Route
                                            path='/account/users'
                                            exact
                                            component={
                                                React.lazy(async () => await import('./areas/account/user.list'))} />
                                        <Route
                                            path='/account/users/edit'
                                            component={React.lazy(() => import('./areas/account/user.edit'))} />
                                        <Route
                                            path='/recipes'
                                            component={React.lazy(() => import('./areas/recipes/recipes'))} />
                                        <Route
                                            path='/authorize/login'
                                            component={React.lazy(() => import('./areas/authorize/login'))} />
                                        <Route
                                            path='/authorize/create'
                                            component={React.lazy(() => import('./areas/authorize/createUser'))} />
                                        <Route component={React.lazy(() => import('./lazy/404'))} />
                                    </Switch>
                                </CardContent>
                            </React.Suspense>
                        </Container>
                    </SnackbarProvider>
                </AuthorizeContext.Provider>
            </ThemeProvider>
        </Router>
    );
}

const HotRender = hot(Render);

ReactDOM.render(<HotRender />, document.getElementById('container'));
