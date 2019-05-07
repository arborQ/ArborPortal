import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { login } from "bx-services/account"

function LoginAction() {
    login();
}

function Render(props: { text: string }): JSX.Element {
    const [name, updateName] = React.useState(props.text);
    const [lazyComponent, loadComponent] = React.useState<JSX.Element>(<div>not loaded</div>);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={LoginAction}>Login</Button>
                </Toolbar>
            </AppBar>
            <Card style={{maxWidth: 800, width: "90%", margin: "20px auto"}}>
                <CardContent>
                    <React.Suspense fallback={() => <div>Loading ...</div>}>
                        <Router>
                            <Route path="/users" component={React.lazy(() => import("./account/user.list"))} />
                        </Router>
                    </React.Suspense>
                </CardContent>
            </Card>
        </div>
    );
}

ReactDOM.render(<div><Render text="default"></Render></div>, document.getElementById("container"));