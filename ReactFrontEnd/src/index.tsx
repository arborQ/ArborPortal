import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { login } from "bx-services/account"

function LoginAction() {
    login();
}

const AppButtons = withRouter(({ history, match }) => {
    return (
        <Toolbar>
            <Button color="default" onClick={(LoginAction)}>Login</Button>
            <Button color={ match.path !== "/users/list" ? "inherit": "default" } onClick={() => history.push("/users/list")}>Users</Button>
            <Button color={ match.path !== "/users/edit" ? "inherit": "default" } onClick={() => history.push("/users/edit")}>Edit user</Button>
        </Toolbar>
    );
});

function Render(props: { text: string }): JSX.Element {
    const [name, updateName] = React.useState(props.text);
    const [lazyComponent, loadComponent] = React.useState<JSX.Element>(<div>not loaded</div>);

    return (
        <div>
            <Router>
                <AppBar position="static">
                    <AppButtons />
                </AppBar>
                <Card style={{maxWidth: 800, width: "90%", margin: "20px auto"}}>
                    <CardContent>
                        <React.Suspense fallback={() => <div>Loading ...</div>}>
                            <Switch>
                                <Route path="/" exact component={React.lazy(() => import("./lazy/home"))} />
                                <Route path="/users/list" exact component={React.lazy(async () => await import("./account/user.list"))} />
                                <Route path="/users/edit" exact component={React.lazy(() => import("./account/user.edit"))} />
                                <Route component={React.lazy(() => import("./lazy/404"))} />
                            </Switch>
                        </React.Suspense>
                    </CardContent>
                </Card>
            </Router>
        </div>
    );
}


ReactDOM.render(<div><Render text="default"></Render></div>, document.getElementById("container"));