import * as React from "react";
import * as ReactDOM from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, withRouter } from "react-router-dom";
import styled from 'styled-components'
import ChangeLanguageButton from './components/change.language.button';
import LoginButton from './components/login.button';
import LogOutButton from './components/logout.button';
import './translations/i18n';
import { isAuthorized as isAuthorizedAction } from '@bx-services/account'
import AuthorizeContext from '@bx-contexts/authorize.context';

const StyledNavLink = styled(NavLink)`
    color: #FFF;

    &.selected {
        color: #CCC;
    }
`;

const links = [
    { text: 'Home', path: '/' },
    { text: 'List', path: '/account/users?sortBy=login&sortDirection=asc' },
    { text: 'Error', path: '/error' },
].map(l => <StyledNavLink className={'MuiButtonBase-root MuiButton-root MuiButton-text'} exact={l.path === '/'} key={l.path} to={l.path} activeClassName="selected">{l.text}</StyledNavLink>);

function Render(): JSX.Element | null {
    const [isAuthorized, changeAutorized] = React.useState(false)
    const [userStatusChecked, changeuserStatus] = React.useState(false)

    React.useEffect(() => {
        isAuthorizedAction().then(result => {
            changeAutorized(result);
            changeuserStatus(true);
        });
    });

    if (!userStatusChecked) {
        return null;
    }

    return (
        <Router>
            <AuthorizeContext.Provider value={{ isAuthorized }}>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            {links}
                            {!isAuthorized
                                ? <LoginButton onAuthorized={() => changeAutorized(true)} />
                                : <LogOutButton onUnauthorized={() => changeAutorized(false) } />
                            }
                            <ChangeLanguageButton name={''} />
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{ width: '90%', maxWidth: 1200, margin: '10px auto' }}>
                    <React.Suspense fallback={<div>Loading ...</div>}>
                        <CardContent >
                            <Switch>
                                <Route path="/" exact component={React.lazy(() => import("./lazy/home"))} />
                                <Route path="/account/users" exact component={React.lazy(async () => await import("./account/user.list"))} />
                                <Route path="/account/users/edit" component={React.lazy(() => import("./account/user.edit"))} />
                                <Route component={React.lazy(() => import("./lazy/404"))} />
                            </Switch>
                        </CardContent>
                    </React.Suspense>
                </div>
            </AuthorizeContext.Provider>
        </Router>
    );
}

ReactDOM.render(<Render />, document.getElementById("container"));