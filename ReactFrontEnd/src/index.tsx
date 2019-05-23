import * as React from "react";
import * as ReactDOM from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

async function LoginAction() {
    const { login } = await import('bx-services/account');
    login();
}

const linkStyle = { textDecoration: 'none' };

function Render(): JSX.Element {
    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="default"><Link style={linkStyle} to={'/'}>Home</Link></Button>
                        <Link to={'/users/list'}><Button color="default">List</Button></Link>
                        <Link to={'/users/edit'}><Button color="default">Edit</Button></Link>
                        <Link to={'/404'}><Button color="default">Some error...</Button></Link>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{ width: '90%', maxWidth: 1200, margin: '10px auto' }}>
                <React.Suspense fallback={<div>Loading ...</div>}>
                    <Card>
                        <CardContent >
                            <Switch>
                                <Route path="/" exact component={React.lazy(() => import("./lazy/home"))} />
                                <Route path="/users/list" exact component={React.lazy(async () => await import("./account/user.list"))} />
                                <Route path="/users/edit" exact component={React.lazy(() => import("./account/user.edit"))} />
                                <Route component={React.lazy(() => import("./lazy/404"))} />
                            </Switch>
                        </CardContent>
                    </Card>
                </React.Suspense>
            </div>
        </Router>
    );
}

ReactDOM.render(<Render />, document.getElementById("container"));