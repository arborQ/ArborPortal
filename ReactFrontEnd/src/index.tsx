import * as React from "react";
import * as ReactDOM from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, withRouter } from "react-router-dom";
import styled from 'styled-components'
import ChangeLanguageButton from './components/change.language.button';
import './translations/i18n';

async function LoginAction() {
    const { login } = await import('@bx-services/account');
    login();
}

const StyledNavLink = styled(NavLink)`
    color: #FFF;

    &.selected {
        color: #CCC;
    }
`;

const links = [
    { text: 'Home', path: '/' },
    { text: 'List', path: '/users/list' },
    { text: 'Edit', path: '/users/edit?id=1' },
    { text: 'Error', path: '/error' },
].map(l => <StyledNavLink className={'MuiButtonBase-root MuiButton-root MuiButton-text'} exact={l.path === '/'} key={l.path} to={l.path} activeClassName="selected">{l.text}</StyledNavLink>);

function Render(): JSX.Element {
    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {links}
                        <ChangeLanguageButton name={'lol'} />
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{ width: '90%', maxWidth: 1200, margin: '10px auto' }}>
                <React.Suspense fallback={<div>Loading ...</div>}>
                    <CardContent >
                        <Switch>
                            <Route path="/" exact component={React.lazy(() => import("./lazy/home"))} />
                            <Route path="/users/list" exact component={React.lazy(async () => await import("./account/user.list"))} />
                            <Route path="/users/edit" component={React.lazy(() => import("./account/user.edit"))} />
                            <Route component={React.lazy(() => import("./lazy/404"))} />
                        </Switch>
                    </CardContent>
                </React.Suspense>
            </div>
        </Router>
    );
}

ReactDOM.render(<Render />, document.getElementById("container"));