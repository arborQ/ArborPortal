import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

async function LoginAction() {
    const { login } = await import('bx-services/account');
    login();
}

function Render(props: { text: string }): JSX.Element {
    return (
        <div>
            <div>
                <div><Link to={'/'}>Home</Link></div>
                <div><Link to={'/users/list'}>List</Link></div>
                <div><Link to={'/users/edit'}>Edit</Link></div>
                <div><Link to={'/404'}>Eror :)</Link></div>
            </div>
            <React.Suspense fallback={<div>Loading ...</div>}>
                <Switch>
                    <Route path="/" exact component={React.lazy(() => import("./lazy/home"))} />
                    <Route path="/users/list" exact component={React.lazy(async () => await import("./account/user.list"))} />
                    <Route path="/users/edit" exact component={React.lazy(() => import("./account/user.edit"))} />
                    <Route component={React.lazy(() => import("./lazy/404"))} />
                </Switch>
            </React.Suspense>
        </div>
    );
}


ReactDOM.render(<Router><Render text="default"></Render></Router>, document.getElementById("container"));